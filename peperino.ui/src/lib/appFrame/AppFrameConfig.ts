import { MenuAction } from "./menuAction";

export interface AppFrameConfig {
    toolbarText?: string;
    overwrite?: boolean;
    userAvatarIcon?: JSX.Element;
    userAvatarActions?: MenuAction[];
    contextMenuIcon?: JSX.Element;
    contextMenuActions?: MenuAction[];
}