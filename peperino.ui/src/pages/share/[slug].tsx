import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FullLoadingPage } from "../../components/loadingScreen/FullLoadingPage";
import { ClientApi } from "../../lib/auth/client/apiClient";
import { useAuthGuard } from "../../lib/auth/client/useAuthGuard";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { useApplicationState } from "../../lib/state/ApplicationState";

interface Props {
}

const SharedLinkPage = observer((props: Props) => {
    useAuthGuard();

    const router = useRouter();
    const appFrame = useApplicationState().getAppFrame();

    useEffect(() => {
        appFrame.withLoadingScreen(async () => {
            const slug = router.query["slug"] as string ?? "";
            const response = await ClientApi.sharedLink.executeSharedLink(slug);
            if (response.entityType === "Room") {
                router.replace(KnownRoutes.Room(response.slug));
            }
        })
    }, []);

    return (
        <FullLoadingPage text="" />
    );
});

export default SharedLinkPage;