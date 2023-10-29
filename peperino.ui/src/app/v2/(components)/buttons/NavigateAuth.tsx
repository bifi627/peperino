"use client"

import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useAppFrameStore } from "../../../(components)/state/appFrameState";

export const NavigateAuth = () => {
    const router = useRouter();
    const appFrame = useAppFrameStore();
    return (
        <>
            <Button onClick={() => {
                router.push("/v2/room")
            }}>Room</Button>
            <Button onClick={() => {
                appFrame.setTitle("TEST123");
            }}>Set Title</Button>
            <Button onClick={() => {
                appFrame.setTitle("");
            }}>Delete Title</Button>
            <Button onClick={async () => {
                await appFrame.withLoading(async () => {
                    return await new Promise((resolve, reject) => setTimeout(resolve, 2000))
                }, "Overlay");
            }}>Test Load</Button>
        </>
    );
}