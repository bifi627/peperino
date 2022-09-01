import { AppBar, Toolbar } from "@mui/material";
import { observer } from "mobx-react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCommonApplicationState } from "../../lib/state/ApplicationState";
import { DynamicToolbar } from "./DynamicToolbar";
import { LoadingProvider } from "./PageMiddleware/LoadingMiddleware";

interface Props {
    children?: React.ReactNode;
}
export const AppFrame = observer((props: Props) => {

    const appState = useCommonApplicationState();

    return (
        <div style={{ height: "100vh" }}>
            <LoadingProvider loading={appState.showLoading === "Full"}>
                <AppBar position="fixed">
                    <DynamicToolbar />
                </AppBar>
                <Toolbar />
                <LoadingProvider loading={appState.showLoading === "Page"}>
                    {props.children}
                </LoadingProvider>
                <ToastContainer />
            </LoadingProvider>
        </div>
    );
});
