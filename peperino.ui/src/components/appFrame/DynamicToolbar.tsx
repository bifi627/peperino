import { IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useAppFrameConfig } from "../../lib/appFrame/useAppFrameConfig";
import { ContextAction } from "./ContextAction";
import { UserAvatarMenu } from "./UserAvatarMenu";

export const DynamicToolbar = () => {
    const router = useRouter();

    const appFrameConfig = useAppFrameConfig();

    return (
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            </IconButton>
            <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit" component="div">
                {router.route} | {router.pathname} | {router.asPath} | {router.basePath}
            </Typography>
            {appFrameConfig.contextMenuActions && <ContextAction />}
            <UserAvatarMenu />
        </Toolbar>
    );
}