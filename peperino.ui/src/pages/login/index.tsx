import { EmailAuthProvider, getAuth, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
import StyledFirebaseAuth from "../../components/firebaseui/StyledFirebaseAuth";
import { KnownRoutes } from "../../lib/routing/knownRoutes";

const LoginPage = () => {
    const router = useRouter();

    const redirect = router.query["redirect"] as string | undefined;

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: (result) => {
                setTimeout(() => router.push(redirect ?? KnownRoutes.Root()), 2000);
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
        <div>
            <StyledFirebaseAuth firebaseAuth={getAuth()} uiConfig={uiConfig}></StyledFirebaseAuth>
        </div>
    );
};

export default LoginPage;
