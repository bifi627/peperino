import { DeleteForever, Share } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { CardAction } from "../../../components/Common/Cards/CardAction";
import { EditTextCardAction } from "../../../components/Common/Cards/EditTextCardAction";
import { UserCardAction } from "../../../components/Common/Cards/UserCardAction";
import { AppFrame } from "../../../components/appFrame/AppFrame";
import { RoomQueries } from "../../../hooks/queries/roomQueries";
import { SharedLinkOutDto, UserOutDto } from "../../../lib/api";
import { ClientApi } from "../../../lib/auth/client/apiClient";
import { useClientAuthGuard } from "../../../lib/auth/client/useClientAuthGuard";
import { checkAccessLevel } from "../../../lib/helper/common";
import { useAppFrameConfig } from "../../../lib/hooks/useAppFrameConfig";
import { KnownRoutes } from "../../../lib/routing/knownRoutes";
import { FRONTEND_URL } from "../../../shared/constants";

interface Props {
}

const GroupSettingsPage = observer((props: Props) => {
    useClientAuthGuard();

    const appFrame = useAppFrameConfig();
    const router = useRouter();

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

    const canWrite = checkAccessLevel("Write", room?.accessLevel)

    const renameRoom = async (newName: string) => {
        if (room) {
            await ClientApi.room.renameRoom(room.slug, { slug: room.slug, newName: newName });
            await roomBySlugIdQuery.refetch();
        }
    }

    const removeUserAccess = async (user: UserOutDto) => {
        if (room) {
            if (confirm("Zugriff löschen?")) {
                await ClientApi.room.revokeUserAccess(room.slug, { slug: room.slug, userId: user.id });
                await roomBySlugIdQuery.refetch();
            }
        }
    }

    return (
        <AppFrame style="OnlyBack" toolbarText="Einstellungen">
            {!canWrite && <CardAction mainText={room?.roomName ?? "Name"} />}
            {canWrite && <EditTextCardAction mainText={room?.roomName ?? ""} onTextChanged={renameRoom} />}
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
            <UserCardAction users={(room?.users ?? []).filter(u => u.id !== getAuth().currentUser?.uid)} onDelete={removeUserAccess} />
        </AppFrame>
    );
});

export default GroupSettingsPage;