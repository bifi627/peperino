import { Groups, Home, Login, StreamSharp } from "@mui/icons-material";
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
        const drawerItems: DrawerItem[] = []

        const home = new DrawerItem();
        home.text = "Peperino";
        home.icon = <Home />;
        home.action = async () => { await this.router?.push(KnownRoutes.Root()) };
        home.childItems = [];

        drawerItems.push(home);

        const demo = new DrawerItem();
        demo.text = "Demo";
        demo.icon = <StreamSharp />;
        demo.action = async () => { await this.router?.push(KnownRoutes.Demo()) };
        demo.childItems = [];

        user && drawerItems.push(demo);

        const rooms = new DrawerItem();
        rooms.text = "Rooms";
        rooms.icon = <Groups />;
        rooms.action = async () => { await this.router?.push(KnownRoutes.Room()) };
        rooms.childItems = [];

        user && drawerItems.push(rooms);

        const login = new DrawerItem();
        login.text = "Login";
        login.icon = <Login />;
        login.action = async () => { await this.router?.push(KnownRoutes.Login()) };
        login.childItems = [];

        drawerItems.push(login);

        if (isObservableArray(this.drawerItems)) {
            this.drawerItems.replace(drawerItems)
        }

        return Promise.resolve();
    }

    public async withLoadingScreen(action: () => Promise<unknown>, delay = 200) {
        const t = setTimeout(() => {
            this.showLoading = true;
        }, delay);
        try {
            await action();
        }
        finally {
            clearTimeout(t);
            this.showLoading = false;
        }
    }
}