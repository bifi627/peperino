import { ChevronLeft, Menu } from "@mui/icons-material";
import { IconButton, Toolbar, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { MenuAction } from "../../lib/appFrame/Action";
import { useApplicationState } from "../../lib/state/ApplicationState";
import { ContextAction } from "./ContextAction";
import { UserAvatarMenu } from "./UserAvatarMenu";

export type AppBarStyle = "Hamburger" | "OnlyBack"

interface Props {
    menuClick?: () => void;
    menuActions?: MenuAction[];
    toolbarText?: string;
    style: AppBarStyle
}

export const DynamicToolbar = observer((props: Props) => {
    const env = useApplicationState().environment;

    const envTag = env && env.railwaY_ENVIRONMENT !== "production" ? ` [${env.railwaY_ENVIRONMENT}]` : "";

    const router = useRouter();

    return (
        <Toolbar>
            {props.style === "Hamburger" &&
                <IconButton onClick={() => props.menuClick?.()} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <Menu />
                </IconButton>
            }
            {props.style === "OnlyBack" &&
                <IconButton onClick={() => router.back()} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <ChevronLeft />
                </IconButton>
            }
            <Typography sx={{ flexGrow: 1, overflow: "hidden", lineBreak: "anywhere" }} variant="h6" color="inherit" component="div">
                {`${props.toolbarText?.toString() ?? ""}${envTag}`}
            </Typography>
            {(props.menuActions?.length ?? 0) > 0 && <ContextAction actions={props.menuActions ?? []} />}
            <UserAvatarMenu />
        </Toolbar>
    );
});
