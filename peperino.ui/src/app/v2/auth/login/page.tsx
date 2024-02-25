"use client";

import { EmailAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppFrameStore } from "../../../(components)/state/appFrameState";
import StyledFirebaseAuth from "../../../../components/firebaseui/StyledFirebaseAuth";
import { KnownRoutes } from "../../../../lib/routing/knownRoutes";
import { GlobalApplicationStateObject } from "../../../../lib/state/ApplicationState";

import "@/lib/auth/client/firebase";

export default function Page() {
    const router = useRouter();
    const params = useSearchParams();

    const redirect = params?.get("redirect");

    const appFrame = useAppFrameStore();

    useEffect(() => {
        appFrame.setTitle("Login");
    }, []);

    const uiConfig: firebaseui.auth.Config = {
        // Popup signin flow rather than redirect flow.
        signInFlow: "popup",
        callbacks: {
            signInSuccessWithAuthResult: () => {
                appFrame.withLoading(async () => {
                    await GlobalApplicationStateObject.initClientState();
                    setTimeout(() => {
                        router.replace(redirect ?? KnownRoutes.V2.Root());
                        router.refresh();
                    }, 100);
                });

                return false;
            },
            signInFailure: (error) => {
                console.error(error);
            },
        },
        // We will display Google and Facebook as auth providers.
        signInOptions: [GoogleAuthProvider.PROVIDER_ID, EmailAuthProvider.PROVIDER_ID],
    };

    return <StyledFirebaseAuth firebaseAuth={getAuth()} uiConfig={uiConfig} />;
}
