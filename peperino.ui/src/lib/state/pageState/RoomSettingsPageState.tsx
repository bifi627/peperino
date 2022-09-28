import { makeObservable, observable } from "mobx";
import Router from "next/router";
import { FRONTEND_URL } from "../../../shared/constants";
import { RoomOutDto } from "../../api";
import { ClientApi } from "../../auth/client/apiClient";
import { KnownRoutes } from "../../routing/knownRoutes";
import { BasePageState } from "../BasePageState";
import { ApplicationInitOptions } from "../BaseState";

export class RoomSettingsPageState extends BasePageState {
    public room?: RoomOutDto = undefined;

    constructor() {
        super();
        makeObservable(this, {
            room: observable,
        });
    }

    public override applicationInit(options: ApplicationInitOptions) {
        super.applicationInit(options);

        this.appFrameConfig.toolbarText = "Raumeinstellungen";

        return Promise.resolve();
    }

    public async share() {
        if (this.room) {
            const link = await ClientApi.sharedLink.createSharedLink({ entityType: "Room", slug: this.room.slug, grantAccessLevel: "WriteContent" });

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
    }

    public async delete() {
        if (this.room && confirm("Wirklich löschen?") === true) {
            await ClientApi.room.deleteBySlug(this.room.slug);
            await Router.push(KnownRoutes.Room());
        }
    }
}