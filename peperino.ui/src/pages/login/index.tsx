import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseui from "firebaseui";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "../../components/firebaseui/StyledFirebaseAuth";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { GlobalApplicationStateObject, useApplicationState } from "../../lib/state/ApplicationState";

const LoginPage = () => {
    const router = useRouter();

    const redirect = router.query["redirect"] as string | undefined;

    const appFrame = useApplicationState().getAppFrame();

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: (result) => {
                appFrame.withLoadingScreen(async () => {
                    await GlobalApplicationStateObject.initState(router);
                    await router.replace({
                        pathname: redirect || KnownRoutes.Root(),
                    });
                });

                return false;
            },
            signInFailure: (error) => {
                console.error(error);
            }
        },
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            GoogleAuthProvider.PROVIDER_ID,
            EmailAuthProvider.PROVIDER_ID,
        ],
    };

    return (
        <StyledFirebaseAuth firebaseAuth={getAuth()} uiConfig={uiConfig}></StyledFirebaseAuth>
    );
};

export default LoginPage;
