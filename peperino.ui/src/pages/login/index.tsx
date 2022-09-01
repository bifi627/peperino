import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "../../components/firebaseui/StyledFirebaseAuth";
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { useCommonApplicationState } from "../../lib/state/ApplicationState";

const LoginPage = () => {
    const router = useRouter();

    const redirect = router.query["redirect"] as string | undefined;

    const appState = useCommonApplicationState();

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: (result) => {

                appState.withLoadingScreen(() => {
                    return new Promise<void>(resolve => {
                        setTimeout(async () => {
                            await router.push(redirect ?? KnownRoutes.Root())
                            resolve();
                        }, 2000);
                    });
                }, "Full");

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
