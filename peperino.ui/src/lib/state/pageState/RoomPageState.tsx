import { Delete, Settings, Share } from "@mui/icons-material";
import { makeObservable, observable } from "mobx";
import Router from "next/router";
import { RoomOutDto, RoomService } from "../../api";
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

    public override init(applicationState: ApplicationState) {
        this.appFrameConfig = {
            toolbarText: "Room Page",
            contextMenuActions: [
                {
                    id: "settings",
                    action: async () => {
                        if (this.room) {
                            await Router.push(KnownRoutes.RoomSettings(this.room.slug));
                        }
                    },
                    icon: <Settings />,
                    text: "settings",
                }
            ]
        }

        return Promise.resolve();
    }
}

export class RoomSettingsPageState extends BasePageState {
    public room?: RoomOutDto = undefined;

    constructor() {
        super();
        makeObservable(this, {
            room: observable,
        });
    }

    public override init(applicationState: ApplicationState) {
        this.appFrameConfig = {
            toolbarText: "Settings Page",
            contextMenuActions: [
                {
                    id: "share",
                    action: () => Promise.resolve(),
                    icon: <Share />,
                    text: "share",
                },
                {
                    id: "delete",
                    action: async () => {
                        applicationState.getAppFrame().withLoadingScreen(async () => {
                            if (this.room && confirm("Wirklich löschen?") === true) {
                                await RoomService.deleteBySlug(this.room.slug);
                                await Router.push(KnownRoutes.Room());
                            }
                        });
                    },
                    icon: <Delete />,
                    text: "delete",
                },
            ]
        }

        return Promise.resolve();
    }
}