import { Menu } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useAppFrameConfig } from "../../lib/hooks/useAppFrameConfig";
import { ContextAction } from "./ContextAction";
import { UserAvatarMenu } from "./UserAvatarMenu";

interface Props {
    menuClick?: () => void;
}

export const DynamicToolbar = observer((props: Props) => {
    const appFrameConfig = useAppFrameConfig();

    return (
        <Toolbar>
            <IconButton onClick={() => props.menuClick?.()} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <Menu />
            </IconButton>
            <Typography sx={{ flexGrow: 1, overflow: "hidden", lineBreak: "anywhere" }} variant="h6" color="inherit" component="div">
                {appFrameConfig?.toolbarText}
            </Typography>
            {appFrameConfig?.contextMenuActions?.length > 0 && <ContextAction />}
            <UserAvatarMenu />
        </Toolbar>
    );
});
