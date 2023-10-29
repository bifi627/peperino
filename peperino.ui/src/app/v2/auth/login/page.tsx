"use client"

import { EmailAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import StyledFirebaseAuth from "../../../../components/firebaseui/StyledFirebaseAuth";
import { KnownRoutes } from "../../../../lib/routing/knownRoutes";
import { GlobalApplicationStateObject, useApplicationState } from "../../../../lib/state/ApplicationState";

export default function Page() {
    const router = useRouter();
    const params = useSearchParams();

    const redirect = params?.get("redirect");

    const appFrame = useApplicationState().getAppFrame();

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: (result) => {
                appFrame.withLoadingScreen(async () => {
                    await GlobalApplicationStateObject.initClientState();
                    router.replace(redirect || KnownRoutes.Root())
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
}