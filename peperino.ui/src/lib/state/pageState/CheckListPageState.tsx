import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { Refresh } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { action, isObservable, makeAutoObservable, makeObservable, observable } from "mobx";
import { BaseCheckListItemOutDto, CheckListOutDto, LinkCheckListItemOutDto, TextCheckListItemOutDto } from "../../api";
import { isTextItem } from "../../apiHelper/checkListItemGuards";
import { ClientApi } from "../../auth/client/apiClient";
import { arrayMoveMutable } from "../../helper/common";
import { KnownRoutes } from "../../routing/knownRoutes";
import { BasePageState } from "../BasePageState";
import { ApplicationInitOptions } from "../BaseState";

export class CheckListPageState extends BasePageState {
    private _checkList?: CheckListOutDto = undefined;

    public get checkList() {
        return this._checkList;
    }

    public get checkedItems() {
        return this.checkList?.entities.slice().filter(e => e.checked === true).sort((a, b) => a.sortIndex - b.sortIndex) ?? [];
    }

    public get uncheckedItems() {
        return this.checkList?.entities.slice().filter(e => e.checked === false).sort((a, b) => a.sortIndex - b.sortIndex) ?? [];
    }

    public set checkList(value: CheckListOutDto | undefined) {
        if (value && !isObservable(value)) {
            makeAutoObservable(value);
        }
        this._checkList = value;
        this.appFrameConfig.toolbarText = value?.name ?? "Check List Page";
    }

    public linkValue = "";

    public linkDialogOpened = false;

    constructor() {
        super();

        makeObservable(this as CheckListPageState & { _checkList: CheckListOutDto }, {
            _checkList: observable,
            _connectionState: observable,
            addTextItem: action,
            addLinkItem: action,
        });
    }

    public override async applicationInit(options: ApplicationInitOptions) {
        super.applicationInit(options);

        if (!getAuth().currentUser) {
            return Promise.resolve();
        }

        this.appFrameConfig.toolbarText = "Liste";
        this.appFrameConfig.contextMenuActions = [
            {
                id: "refresh",
                text: "Aktualisieren",
                icon: <Refresh />,
                action: async () => {
                    await options.state?.getAppFrame().withLoadingScreen(async () => {
                        await this.reloadList();
                    }, 0);
                }
            }
        ];
    }

    public override async userInit(): Promise<void> {
        this.checkList = undefined;
    }

    public override async pageInit(slug: string): Promise<void>
    public override async pageInit(...params: unknown[]): Promise<void> {
        const slug = params[0];
        if (typeof slug === "string") {
            this.checkList = await ClientApi.checkList.getCheckListBySlug(slug);
        }
    }

    public async reloadList() {
        if (this.checkList) {
            const list = await ClientApi.checkList.getCheckListBySlug(this.checkList.slug);
            this.checkList = list;
        }
    }

    public async addLinkItem(text: string, link: string) {
        if (!this.checkList) {
            return;
        }

        const item = {
            id: Math.floor(Math.random() * 10000),
            sortIndex: 9999,
            checked: false,
            title: text,
            link: link,
            itemType: {
                variant: "Link",
                description: "",
                name: "Link",
            }
        } as LinkCheckListItemOutDto;

        makeAutoObservable(item);

        this.checkList.entities.push(item);
        const result = await ClientApi.checkListItem.addLinkItem(this.checkList.slug, item);
        item.id = result.id;
    }

    public async addTextItem(text: string) {
        if (!this.checkList) {
            return;
        }

        const existing = this.checkList.entities.find(e => isTextItem(e) && e.text === text) as TextCheckListItemOutDto;

        // If this text already exists, we want to move it to the latest unchecked element
        if (existing && existing.text.length >= 3) {
            if (existing.checked === true) {
                await this.toggleItemCheck(existing);
            }
            else {
                const sorted = this.uncheckedItems.sort(i => i.sortIndex);
                const from = sorted.indexOf(existing);
                const to = sorted.length + 1;

                await this.moveItems(sorted, from, to);
            }
        }
        else {
            const item = {
                id: Math.floor(Math.random() * 10000),
                sortIndex: 9999,
                checked: false,
                text: text,
                itemType: {
                    variant: "Text",
                    description: "",
                    name: "Text",
                }
            } as TextCheckListItemOutDto;

            makeAutoObservable(item);

            this.checkList.entities.push(item);
            const result = await ClientApi.checkListItem.addTextItem(this.checkList.slug, { text: text });
            item.id = result.id;
        }
    }

    public async deleteItem(slug: string, item: BaseCheckListItemOutDto) {
        if (this.checkList) {
            this.checkList.entities.splice(this.checkList.entities.indexOf(item), 1);
        }
        await ClientApi.checkListItem.deleteCheckListItem(slug, item.id);
    }

    public async arrangeItems(slug: string) {
        if (this.checkList) {
            await ClientApi.checkListItem.arrangeSortIndex(slug, { items: this.checkList.entities });
        }
    }

    public async updateTextCheckItem(slug: string, item: BaseCheckListItemOutDto, text: string) {
        if (this.checkList) {
            await ClientApi.checkListItem.updateCheckListItem(slug, item);
        }
    }

    public async moveItems(sourceArray: BaseCheckListItemOutDto[], from: number, to: number) {
        const tempList = [...sourceArray];
        arrayMoveMutable(tempList, from, to);
        tempList.forEach((item, i) => {
            item.sortIndex = i;
        });

        await this.arrangeItems(this.checkList?.slug ?? "");
    }

    public async toggleItemCheck(item: BaseCheckListItemOutDto) {
        if (!this.checkList) {
            return;
        }

        if (item.checked === false) {
            if (this.checkedItems.length === 0) {
                item.sortIndex = 0;
            }
            else {
                item.sortIndex = Math.min(...this.checkedItems.map(i => i.sortIndex));
                this.checkedItems.forEach(item => {
                    item.sortIndex++;
                });
            }
        }
        else {
            if (this.uncheckedItems.length === 0) {
                item.sortIndex = 0;
            }
            else {
                item.sortIndex = Math.max(...this.uncheckedItems.map(i => i.sortIndex)) + 1;
            }
        }

        item.checked = !item.checked;

        await this.arrangeItems(this.checkList.slug);
        await ClientApi.checkListItem.toggleCheck(this.checkList.slug, item.id);
    }

    private notificationHubConnection?: HubConnection;
    private _connectionState: HubConnectionState = HubConnectionState.Disconnected;
    public get ConnectionState() {
        return this._connectionState;
    }

    public async connectSignalR() {
        if (!this.checkList) {
            return;
        }
        const url = KnownRoutes.SignalR.CheckList();
        this.notificationHubConnection = new HubConnectionBuilder().withUrl(url,
            {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
                accessTokenFactory: () => getAuth().currentUser?.getIdToken() ?? "",
            }).withAutomaticReconnect().build();

        this.subscribeWebSocketEvents();

        this.notificationHubConnection.on("Update", async () => {
            {
                await this.reloadList();
                this._connectionState = this.notificationHubConnection?.state ?? HubConnectionState.Disconnected;
                console.log("UPDATE");
            }
        });

        await this.notificationHubConnection.start();
        try {
            await this.notificationHubConnection.send("JoinList", this.checkList.slug);
        }
        catch (error) {
            console.error(error);
        }
    }

    public async disconnectSignalR() {
        if (this.notificationHubConnection) {
            this.notificationHubConnection.state === HubConnectionState.Connected && this.notificationHubConnection.send("LeaveList", this.checkList?.slug).then(() => {
                this.notificationHubConnection?.stop();
            });
        }
    }

    private subscribeWebSocketEvents() {
        if (this.notificationHubConnection) {
            this.notificationHubConnection.onclose(() => {
                this._connectionState = this.notificationHubConnection?.state ?? HubConnectionState.Disconnected;
            });

            this.notificationHubConnection.onreconnected(() => {
                this._connectionState = this.notificationHubConnection?.state ?? HubConnectionState.Disconnected
            })
            this.notificationHubConnection.onreconnecting(() => {
                this._connectionState = this.notificationHubConnection?.state ?? HubConnectionState.Disconnected
            })

            this.notificationHubConnection.on("connected", () => {
                this._connectionState = this.notificationHubConnection?.state ?? HubConnectionState.Disconnected
            });

            this.notificationHubConnection.on("ListJoined", async () => {
                console.log("HubConnection: ListJoined");
            });

            this.notificationHubConnection.on("Update", async () => {
                console.log("HubConnection: Update");
                await this.reloadList();
            });
        }
    }
}
