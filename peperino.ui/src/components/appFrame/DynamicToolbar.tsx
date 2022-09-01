import { Menu } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { useAppFrameConfig } from "../../lib/appFrame/useAppFrameConfig";
import { ContextAction } from "./ContextAction";
import { UserAvatarMenu } from "./UserAvatarMenu";

interface Props {
    menuClick?: () => void;
}

export const DynamicToolbar = (props: Props) => {
    const appFrameConfig = useAppFrameConfig();

    return (
        <Toolbar>
            <IconButton onClick={() => props.menuClick?.()} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <Menu />
            </IconButton>
            <Typography sx={{ flexGrow: 1 }} variant="h6" color="inherit" component="div">
                {appFrameConfig.toolbarText}
            </Typography>
            {appFrameConfig.contextMenuActions && <ContextAction />}
            <UserAvatarMenu />
        </Toolbar>
    );
}