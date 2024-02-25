"use client";

import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

import "@/lib/auth/client/firebase";
import { KnownRoutes } from "@/lib/routing/knownRoutes";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const params = useSearchParams();
    const redirect = params?.get("redirect");

    useEffect(() => {
        (async () => {
            await signOut(getAuth());
            router.replace(redirect ?? KnownRoutes.V2.Root());
        })();
    });

    return <>Logout</>;
}
