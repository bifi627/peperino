import { AppBar, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useApplicationState } from "../../lib/state/ApplicationState";
import { DynamicDrawer } from "./Drawer/DynamicDrawer";
import { DynamicToolbar } from "./DynamicToolbar";
import { LoadingProvider } from "./PageMiddleware/LoadingMiddleware";

interface Props {
    children?: React.ReactNode;
}
export const AppFrame = observer((props: Props) => {

    const appFrame = useApplicationState().getAppFrame();

    const theme = useTheme();

    const router = useRouter();

    return (
        <div style={{ height: "100vh" }}>
            <LoadingProvider>
                <AppBar position="sticky">
                    <DynamicToolbar menuClick={() => appFrame.drawerOpened = !appFrame.drawerOpened} />
                </AppBar>
                {/* <Toolbar /> */}
                <DynamicDrawer items={appFrame.drawerItems} />
                {props.children}
                <ToastContainer />
            </LoadingProvider>
        </div>
    );
});
