import { DeleteForever, Share } from "@mui/icons-material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { AppFrame } from "../../../components/appFrame/AppFrame";
import { CardAction } from "../../../components/Common/Cards/CardAction";
import { RoomQueries } from "../../../hooks/state/roomQueries";
import { SharedLinkOutDto } from "../../../lib/api";
import { ClientApi } from "../../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../../lib/auth/client/useClientAuthGuard";
import { useAppFrameConfig } from "../../../lib/hooks/useAppFrameConfig";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";
import { FRONTEND_URL } from "../../../shared/constants";

interface Props {
}

const GroupSettingsPage = observer((props: Props) => {
    useClientAuthGuard();

    const router = useRouter();
    const appFrame = useAppFrameConfig();

    const roomBySlugIdQuery = RoomQueries.useGetRoomBySlugQuery(router.query["slug"] as string ?? "");
    const room = roomBySlugIdQuery.data;
    appFrame.toolbarText = "Raumeinstellungen";

    function getUrlFromLinkDto(link: SharedLinkOutDto) {
        const subString = KnownRoutes.SharedLink(link.slug);
        const linkWithoutFirstSlash = subString.substring(1, subString.length);
        const linkUrl = FRONTEND_URL + linkWithoutFirstSlash;
        return linkUrl;
    }

    const shareRoom = async () => {
        if (room) {
            const link = await ClientApi.sharedLink.createSharedLink({
                entityType: "Room",
                slug: room.slug,
                grantAccessLevel: "WriteContent"
            });

            const linkUrl = getUrlFromLinkDto(link);

            if (linkUrl.startsWith("https")) {
                await navigator.share({
                    title: "Peperino",
                    text: room.roomName,
                    url: linkUrl,
                });
            }
            else {
                prompt(room.roomName, linkUrl);
            }
        }
    };

    const deleteRoom = async () => {
        if (room && confirm("Wirklich löschen?") === true) {
            await ClientApi.room.deleteBySlug(room.slug);
            await router.push(KnownRoutes.Room());
        }
    }

    return (
        <AppFrame>
            <CardAction mainText={room?.roomName ?? "Name"} />
            <CardAction mainText="Teilen" subTexts={["Lade jemanden mit diesem Link in den Raum ein."]} actions={[{
                id: "share",
                icon: <Share />,
                action: async () => {
                    await shareRoom();
                },
            }]} />
            <CardAction mainText="Löschen" subTexts={["Der Raum wird unwideruflich gelöscht und kann nicht wiederherrgestellt werden."]} actions={[{
                id: "delete",
                icon: <DeleteForever color="error" />,
                action: async () => {
                    await deleteRoom();
                },
            }]} />
        </AppFrame>
    );
});

export default GroupSettingsPage;