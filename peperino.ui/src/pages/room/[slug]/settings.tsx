import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
        <>GroupSettingsPage FOLDER - {groupSettingsState.room?.roomName} - {groupSettingsState.room?.createdBy.userName}</>
    );
});

export default GroupSettingsPage;