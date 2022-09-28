import { AccountCircle, MoreVert } from "@mui/icons-material";
import { makeAutoObservable } from "mobx";
import { MenuAction } from "./Action";

export interface AppFrameConfigInterface {
    toolbarText: string;
    userAvatarIcon: JSX.Element;
    userAvatarActions: MenuAction[];
    contextMenuIcon: JSX.Element;
    contextMenuActions: MenuAction[];
}

export class AppFrameConfig implements AppFrameConfigInterface {
    public toolbarText = "Peperino";
    public userAvatarIcon = <AccountCircle />;
    public userAvatarActions: MenuAction[] = [];
    public contextMenuIcon = <MoreVert />;
    public contextMenuActions: MenuAction[] = [];

    constructor() {
        makeAutoObservable(this);
    }

}