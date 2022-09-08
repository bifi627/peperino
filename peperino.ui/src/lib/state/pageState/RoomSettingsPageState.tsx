import { Delete, Share } from "@mui/icons-material";
import { makeObservable, observable } from "mobx";
import Router from "next/router";
import { FRONTEND_URL } from "../../../shared/constants";
import { AccessLevel, RoomOutDto, RoomService, SharedLinkService } from "../../api";
import { KnownRoutes } from "../../routing/knownRoutes";
import { ApplicationState } from "../ApplicationState";
import { BasePageState } from "../BasePageState";

export class RoomSettingsPageState extends BasePageState {
    public room?: RoomOutDto = undefined;

    constructor() {
        super();
        makeObservable(this, {
            room: observable,
        });
    }

    public override init(applicationState: ApplicationState) {
        this.appFrameConfig.toolbarText = "Settings Page";

        this.appFrameConfig.contextMenuActions = [
            {
                id: "share",
                action: async () => {
                    applicationState.getAppFrame().withLoadingScreen(async () => {
                        if (this.room && confirm("Wirklich teilen?") === true) {
                            const link = await SharedLinkService.createSharedLink({ entityType: "Room", slug: this.room.slug, grantAccessLevel: AccessLevel.WRITE_CONTENT });
                            const linkUrl = FRONTEND_URL + KnownRoutes.SharedLink(link.slug);
                            console.log(linkUrl);
                        }
                    });
                },
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

        return Promise.resolve();
    }
}