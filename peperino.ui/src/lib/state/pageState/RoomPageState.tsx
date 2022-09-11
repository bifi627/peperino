import { Settings } from "@mui/icons-material";
import { makeObservable, observable } from "mobx";
import Router from "next/router";
import { RoomOutDto } from "../../api";
import { KnownRoutes } from "../../routing/knownRoutes";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export class RoomPageState extends BasePageState {
    public room?: RoomOutDto = undefined;

    constructor() {
        super();
        makeObservable(this, {
            room: observable,
        });
    }

    public updateToolbar() {
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

    public override init(applicationState: ApplicationState) {
        this.updateToolbar();
        return Promise.resolve();
    }
}
