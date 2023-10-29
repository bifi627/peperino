"use client"

import { AppBar, Container, Typography } from "@mui/material";
import { usePathname } from "next/navigation";
import React from "react";

import { FullLoadingPage } from "../../components/loadingScreen/FullLoadingPage";
import { OverlayLoadingPage } from "../../components/loadingScreen/OverlayLoadingPage";
import { isClient } from "../../lib/helper/common";
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
        <>
            <AppBar position="sticky">
                <Typography sx={{ flexGrow: 1, overflow: "hidden", lineBreak: "anywhere" }} variant="h6" color="inherit" component="div">
                    {`${appFrame.title ?? ""}${""}`}
                </Typography>
                <Container sx={{ minHeight: "32px" }}></Container>
            </AppBar>
            {appFrame.loadingState === "Full" && <FullLoadingPage />}
            {appFrame.loadingState === "Overlay" && <OverlayLoadingPage>{children}</OverlayLoadingPage>}
            {appFrame.loadingState === undefined && children}
        </>
    );
}