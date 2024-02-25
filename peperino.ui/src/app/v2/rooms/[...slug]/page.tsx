"use client";

import { useAppFrameStore } from "@/app/(components)/state/appFrameState";
import { useEffect } from "react";

export default function Page() {
    const appFrame = useAppFrameStore();

    useEffect(() => {
        appFrame.setTitle("Room");
    }, []);

    return <>Room Page</>;
}
