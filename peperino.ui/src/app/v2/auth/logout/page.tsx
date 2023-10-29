"use client"

import { getAuth, signOut } from "firebase/auth";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        signOut(getAuth());
    });

    return (
        <>Logout</>
    );
}