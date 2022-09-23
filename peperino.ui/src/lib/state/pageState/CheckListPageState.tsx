import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { Refresh } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { action, isObservable, makeAutoObservable, makeObservable, observable } from "mobx";
import { CheckListItemOutDto, CheckListOutDto } from "../../api";
import { ClientApi } from "../../auth/client/apiClient";
import { KnownRoutes } from "../../routing/knownRoutes";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export class CheckListPageState extends BasePageState {
    private _checkList?: CheckListOutDto = undefined;

    public get checkList() {
        return this._checkList!;
    }

    public get checkedItems() {
        return this.checkList.entities.slice().filter(e => e.checked === true).sort((a, b) => a.sortIndex - b.sortIndex);
    }

    public get uncheckedItems() {
        return this.checkList.entities.slice().filter(e => e.checked === false).sort((a, b) => a.sortIndex - b.sortIndex);
    }

    public set checkList(value: CheckListOutDto) {
        if (!isObservable(value)) {
            makeAutoObservable(value);
        }
        this._checkList = value;
        this.appFrameConfig.toolbarText = value.name;
    }

    public inputValue = "";

    constructor() {
        super();

        makeObservable(this as CheckListPageState & { _checkList: CheckListOutDto }, {
            _checkList: observable,
            _connectionState: observable,
            inputValue: observable,
            addItem: action,
        });
    }

    public override async applicationInit(applicationState: ApplicationState) {

        if (!getAuth().currentUser) {
            return Promise.resolve();
        }

        this.appFrameConfig.toolbarText = "Check List Page";
        this.appFrameConfig.contextMenuActions = [
            {
                id: "refresh",
                text: "Refresh",
                icon: <Refresh />,
                action: async () => {
                    await applicationState.getAppFrame().withLoadingScreen(async () => {
                        await this.reloadList();
                    });
                }
            }
        ];
    }

    private notificationHubConnection?: HubConnection;
    private _connectionState: HubConnectionState = HubConnectionState.Disconnected;
    public get ConnectionState() {
        return this._connectionState;
    }

    public async connectSignalR() {
        const url = KnownRoutes.SignalR.CheckList();
        console.log(url);
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
            this.notificationHubConnection.state === HubConnectionState.Connected && this.notificationHubConnection.send("LeaveList", this.checkList.slug).then(() => {
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

    public async reloadList() {
        const list = await ClientApi.checkList.getCheckListBySlug(this.checkList.slug);
        this.checkList = list;
    }

    public async addItem(text: string) {

        const existing = this.checkList.entities.find(e => e.text === text);

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
            await ClientApi.checkList.addCheckListItem(this.checkList.slug, { text: text });
        }
    }

    public async deleteItem(item: CheckListItemOutDto) {
        await ClientApi.checkList.deleteCheckListItem(this.checkList.slug, item.id);
        this.checkList.entities.splice(this.checkList.entities.indexOf(item), 1);
    }

    public async arrangeItems() {
        await ClientApi.checkList.arrangeSortIndex(this.checkList.slug, { items: this.checkList.entities });
    }

    public async updateItem(item: CheckListItemOutDto) {
        await ClientApi.checkList.updateCheckListItem(this.checkList.slug, item.id, item);
    }

    public async moveItems(sourceArray: CheckListItemOutDto[], from: number, to: number) {
        const tempList = [...sourceArray];
        arrayMoveMutable(tempList, from, to);
        tempList.forEach((item, i) => {
            item.sortIndex = i;
        });

        await this.arrangeItems();
    }

    public async toggleItemCheck(item: CheckListItemOutDto) {
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

        await this.arrangeItems();

        item.checked = !item.checked;

        await ClientApi.checkList.updateCheckListItem(this.checkList.slug, item.id, item);
    }
}

function arrayMoveMutable(array: any[], fromIndex: number, toIndex: number) {
    const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

    if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

        const [item] = array.splice(fromIndex, 1);
        array.splice(endIndex, 0, item);
    }
}
