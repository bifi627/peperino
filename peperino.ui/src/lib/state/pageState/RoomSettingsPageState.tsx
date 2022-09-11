import { Delete, Share } from "@mui/icons-material";
import { makeObservable, observable } from "mobx";
import Router from "next/router";
import { FRONTEND_URL } from "../../../shared/constants";
import { RoomOutDto, RoomService, SharedLinkService } from "../../api";
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
                            const link = await SharedLinkService.createSharedLink({ entityType: "Room", slug: this.room.slug, grantAccessLevel: "WriteContent" });

                            const subString = KnownRoutes.SharedLink(link.slug);
                            const linkWithoutFirstSlash = subString.substring(1, subString.length);
                            const linkUrl = FRONTEND_URL + linkWithoutFirstSlash;

                            if (linkUrl.startsWith("https")) {
                                await navigator.share({
                                    title: "Peperino",
                                    text: this.room.roomName,
                                    url: linkUrl,
                                });
                            }
                            else {
                                prompt(this.room.roomName, linkUrl);
                            }

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