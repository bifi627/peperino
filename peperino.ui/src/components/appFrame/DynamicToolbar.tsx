import { Menu } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { MenuAction } from "../../lib/appFrame/Action";
import { useApplicationState } from "../../lib/state/ApplicationState";
import { ContextAction } from "./ContextAction";
import { UserAvatarMenu } from "./UserAvatarMenu";

interface Props {
    menuClick?: () => void;
    menuActions?: MenuAction[];
    toolbarText?: string;
}

export const DynamicToolbar = observer((props: Props) => {
    const env = useApplicationState().environment;

    const envTag = env && env.railwaY_ENVIRONMENT !== "production" ? ` [${env.railwaY_ENVIRONMENT}]` : "";

    return (
        <Toolbar>
            <IconButton onClick={() => props.menuClick?.()} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <Menu />
            </IconButton>
            <Typography sx={{ flexGrow: 1, overflow: "hidden", lineBreak: "anywhere" }} variant="h6" color="inherit" component="div">
                {`${props.toolbarText?.toString() ?? ""}${envTag}`}
            </Typography>
            {(props.menuActions?.length ?? 0) > 0 && <ContextAction actions={props.menuActions ?? []} />}
            <UserAvatarMenu />
        </Toolbar>
    );
});
