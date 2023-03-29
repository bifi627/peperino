import { AppBar } from "@mui/material";
import { observer } from "mobx-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MenuAction } from "../../lib/appFrame/Action";
import { useApplicationState } from "../../lib/state/ApplicationState";
import { DrawerItemInterface } from "./Drawer/DrawerItem";
import { DynamicDrawer } from "./Drawer/DynamicDrawer";
import { DynamicToolbar } from "./DynamicToolbar";
import { LoadingProvider } from "./PageMiddleware/LoadingMiddleware";

interface Props {
    children?: React.ReactNode;
    drawerItems?: DrawerItemInterface[];
    menuActions?: MenuAction[];
    toolbarText?: string;
}
export const AppFrame = observer((props: Props) => {
    const appFrame = useApplicationState().getAppFrame();
    return (
        <div style={{ height: "100vh" }}>
            <LoadingProvider>
                <AppBar position="sticky">
                    <DynamicToolbar toolbarText={props.toolbarText} menuActions={props.menuActions} menuClick={() => appFrame.drawerOpened = !appFrame.drawerOpened} />
                </AppBar>
                {/* <Toolbar /> */}
                <DynamicDrawer items={appFrame.drawerItems} />
                {props.children}
                <ToastContainer />
            </LoadingProvider>
        </div>
    );
});
