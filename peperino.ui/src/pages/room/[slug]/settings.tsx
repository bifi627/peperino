import { DeleteForever, Share } from "@mui/icons-material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CardAction } from "../../../components/Common/Cards/CardAction";
import { ClientApi } from "../../../lib/auth/client/apiClient";
import { useAuthGuard } from "../../../lib/auth/client/useAuthGuard";
import { useApplicationState } from "../../../lib/state/ApplicationState";

interface Props {
}

const GroupSettingsPage = observer((props: Props) => {
    useAuthGuard();

    const groupSettingsState = useApplicationState().getRoomSettingsState();

    const router = useRouter();

    const init = async () => {
        console.log(router.query);
        const slug = router.query["slug"] as string ?? "";
        console.log(slug);
        groupSettingsState.room = await ClientApi.room.getBySlug(slug);
    }

    useEffect(() => {
        init();
    }, [])

    return (
        <>
            <CardAction mainText={groupSettingsState.room?.roomName ?? "Name"} />
            <CardAction mainText="Teilen" subTexts={["Lade jemanden mit diesem Link in den Raum ein."]} actions={[{
                id: "share",
                icon: <Share />,
                action: async () => {
                    await groupSettingsState.share();
                },
            }]} />
            <CardAction mainText="Löschen" subTexts={["Der Raum wird unwideruflich gelöscht und kann nicht wiederherrgestellt werden."]} actions={[{
                id: "delete",
                icon: <DeleteForever color="error" />,
                action: async () => {
                    await groupSettingsState.delete();
                },
            }]} />
        </>
    );
});

export default GroupSettingsPage;