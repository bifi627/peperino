import { Explore, Groups, Home } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { isObservableArray, makeObservable, observable } from "mobx";
import { DrawerItem } from "../../../components/appFrame/Drawer/DrawerItem";
import { KnownRoutes } from "../../routing/knownRoutes";
import { BaseState } from "../BaseState";

export class AppFrameState extends BaseState {
    public key = "AppFrameState";
    public showLoading = false;
    public drawerOpened = false;
    public drawerItems: DrawerItem[] = [];

    constructor() {
        super();

        makeObservable(this, {
            showLoading: observable,
            drawerOpened: observable,
            drawerItems: observable,
        });
    }

    public userInit() {
        const user = getAuth().currentUser;
        const drawerItems: DrawerItem[] = [];

        const home = new DrawerItem();
        home.text = "Peperino";
        home.icon = <Home />;
        home.action = async () => {
            await this.router?.push(KnownRoutes.Root());
        };
        home.childItems = [];

        drawerItems.push(home);

        const rooms = new DrawerItem();
        rooms.text = "Räume";
        rooms.icon = <Groups />;
        rooms.action = async () => {
            await this.router?.push(KnownRoutes.Room());
        };
        rooms.childItems = [];
        user && drawerItems.push(rooms);

        const v2 = new DrawerItem();
        v2.text = "v2";
        v2.icon = <Explore />;
        v2.action = async () => {
            await this.router?.push(KnownRoutes.Root() + "/v2");
        };
        v2.childItems = [];
        drawerItems.push(v2);

        if (isObservableArray(this.drawerItems)) {
            this.drawerItems.replace(drawerItems);
        }

        return Promise.resolve();
    }

    public async withLoadingScreen(action: () => Promise<unknown>, delay = 200) {
        const t = setTimeout(() => {
            this.showLoading = true;
        }, delay);
        try {
            await action();
        } finally {
            clearTimeout(t);
            this.showLoading = false;
        }
    }
}
