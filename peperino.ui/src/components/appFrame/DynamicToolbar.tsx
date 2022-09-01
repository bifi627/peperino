import { IconButton, Toolbar, Typography } from "@mui/material";
import { useAppFrameConfig } from "../../lib/appFrame/useAppFrameConfig";
import { ContextAction } from "./ContextAction";
import { UserAvatarMenu } from "./UserAvatarMenu";

export const DynamicToolbar = () => {
    const appFrameConfig = useAppFrameConfig();

    return (
        <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            </IconButton>
            <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit" component="div">
                {appFrameConfig.toolbarText}
            </Typography>
            {appFrameConfig.contextMenuActions && <ContextAction />}
            <UserAvatarMenu />
        </Toolbar>
    );
}