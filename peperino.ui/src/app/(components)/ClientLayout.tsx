"use client";

import { usePathname } from "next/navigation";
import React from "react";

import { Box } from "@mui/material";
import { FullLoadingPage } from "../../components/loadingScreen/FullLoadingPage";
import { OverlayLoadingPage } from "../../components/loadingScreen/OverlayLoadingPage";
import { isClient } from "../../lib/helper/common";
import { AppFrame } from "../v2/(components)/appFrame/AppFrame";
import { useAppFrameStore } from "./state/appFrameState";

if (isClient()) {
    import("../../lib/apiConfig");
    import("../../lib/auth/client/firebase");
}

interface Props {
    children: React.ReactNode;
}

export const ClientLayout = ({ children }: Props) => {
    const pathname = usePathname();
    const appFrame = useAppFrameStore();

    return (
        <Box height={"100vh"}>
            <AppFrame />
            {appFrame.loadingState === "Full" && <FullLoadingPage />}
            {appFrame.loadingState === "Overlay" && <OverlayLoadingPage>{children}</OverlayLoadingPage>}
            {appFrame.loadingState === undefined && children}
        </Box>
    );
};
