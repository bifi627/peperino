import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FullLoadingPage } from "../../components/loadingScreen/FullLoadingPage";
import { manageSessionForUser } from "../../lib/auth/client/firebase";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { GlobalApplicationStateObject } from "../../lib/state/ApplicationState";

const SSOPage = () => {
    const [user, authLoading, authError] = useAuthState(getAuth());
    const router = useRouter();

    const redirect = router.query["redirect"] as string | undefined;

    useEffect(() => {
        handleSSO();
    }, []);

    const handleSSO = async () => {
        // While loading do nothing
        if (authLoading === true) {
            return;
        }

        // If we have no user we should just redirect to login
        if (!user) {
            await router.replace(KnownRoutes.Login(redirect));
            return;
        }

        // If we have a user we try to refresh the token first
        const token = await user?.getIdToken(true);
        // If we get a new token we set it server side and redirect to the desired page
        if (token) {
            console.log("Set new token");
            console.log(token.substring(token.length - 5));
            await manageSessionForUser(token);
            GlobalApplicationStateObject.stateLoading = true;
            await GlobalApplicationStateObject.init();
            await router.replace({
                pathname: redirect || KnownRoutes.Root(),
            });
        }
        // If we get no token we just redirect to login
        else {
            await router.replace(KnownRoutes.Login(redirect));
        }
    };

    return (
        <FullLoadingPage text="SSO..." />
    );
}

export default SSOPage;