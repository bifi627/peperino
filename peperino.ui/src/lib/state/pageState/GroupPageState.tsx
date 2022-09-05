import { Delete, Settings, Share } from "@mui/icons-material";
import { makeObservable, observable } from "mobx";
import Router from "next/router";
import { UserGroupOutDto, UserGroupService } from "../../api";
import { KnownRoutes } from "../../routing/knownRoutes";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export class GroupPageState extends BasePageState {

    public group?: UserGroupOutDto = undefined;

    constructor() {
        super();
        makeObservable(this, {
            group: observable,
        });
    }

    public override init(applicationState: ApplicationState) {
        this.appFrameConfig = {
            toolbarText: "Group Page",
            contextMenuActions: [
                {
                    id: "settings",
                    action: async () => {
                        if (this.group) {
                            await Router.push(KnownRoutes.GroupSettings(this.group.groupNameSlug));
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

export class GroupSettingsPageState extends BasePageState {
    public group?: UserGroupOutDto = undefined;

    constructor() {
        super();
        makeObservable(this, {
            group: observable,
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
                            if (this.group && confirm("Wirklich löschen?") === true) {
                                await UserGroupService.deleteBySlug(this.group?.groupNameSlug);
                                await Router.push(KnownRoutes.Group());
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