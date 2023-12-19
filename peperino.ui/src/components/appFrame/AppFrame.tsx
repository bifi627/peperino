import { AppBar } from "@mui/material";
import { observer } from "mobx-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuAction } from "../../lib/appFrame/Action";
import { useApplicationState } from "../../lib/state/ApplicationState";
import { DrawerItemInterface } from "./Drawer/DrawerItem";
import { DynamicDrawer } from "./Drawer/DynamicDrawer";
import { AppBarStyle, DynamicToolbar } from "./DynamicToolbar";
import { LoadingProvider } from "./PageMiddleware/LoadingMiddleware";

interface Props {
    children?: React.ReactNode;
    drawerItems?: DrawerItemInterface[];
    menuActions?: MenuAction[];
    toolbarText?: string;
    style?: AppBarStyle;
}

export const AppFrame = observer((props: Props) => {
    const appFrame = useApplicationState().getAppFrame();
    const style = props.style ?? "Hamburger";

    return (
        <div style={{ height: "100vh" }}>
            <LoadingProvider>
                <AppBar position="sticky">
                    <DynamicToolbar
                        menuActions={props.menuActions}
                        menuClick={() => (appFrame.drawerOpened = !appFrame.drawerOpened)}
                        style={style}
                        toolbarText={props.toolbarText}
                    />
                </AppBar>

                {/* <Toolbar /> */}
                <DynamicDrawer items={appFrame.drawerItems} />

                {props.children}

                <ToastContainer />
            </LoadingProvider>
        </div>
    );
});
