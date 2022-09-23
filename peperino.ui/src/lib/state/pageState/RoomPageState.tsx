import { Settings } from "@mui/icons-material";
import { isObservableArray, makeObservable, observable } from "mobx";
import Router from "next/router";
import { CheckListOutDto, RoomOutDto } from "../../api";
import { ClientApi } from "../../auth/client/apiClient";
import { KnownRoutes } from "../../routing/knownRoutes";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export class RoomPageState extends BasePageState {
    public room?: RoomOutDto = undefined;

    public checkLists?: CheckListOutDto[] = [];

    public addCheckListDialogOpened = false;

    constructor() {
        super();
        makeObservable(this, {
            room: observable,
            addCheckListDialogOpened: observable,
            checkLists: observable,
        });
    }

    public updateToolbar() {

        this.appFrameConfig.toolbarText = "Room: " + this.room?.roomName;

        const settingsAction = {
            id: "settings",
            action: async () => {
                if (this.room) {
                    await Router.push(KnownRoutes.RoomSettings(this.room.slug));
                }
            },
            icon: <Settings />,
            text: "settings",
        }

        if (this.room?.accessLevel === "Owner") {
            if (!this.appFrameConfig.contextMenuActions.some(a => a.id === settingsAction.id)) {
                this.appFrameConfig.contextMenuActions.push(settingsAction);
            }
        }
    }

    public override applicationInit(applicationState: ApplicationState) {

        this.appFrameConfig.toolbarText = "Room";

        this.updateToolbar();
        return Promise.resolve();
    }

    public async reloadCheckLists() {
        const lists = await ClientApi.checkList.getAllListInRoom(this.room?.slug);
        if (isObservableArray(this.checkLists)) {
            this.checkLists.replace(lists);
        }
    }

    public async createCheckList(name: string) {
        await ClientApi.checkList.createList({ name: name, roomSlug: this.room?.slug ?? "" });
    }
}
