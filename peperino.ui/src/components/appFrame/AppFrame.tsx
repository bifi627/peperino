import { Groups, Home, Login, StreamSharp } from "@mui/icons-material";
import { AppBar, Toolbar, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { KnownRoutes } from "../../lib/routing/knownRoutes";
import { useApplicationState } from "../../lib/state/ApplicationState";
import { DrawerItemProps, DynamicDrawer } from "./DynamicDrawer";
import { DynamicToolbar } from "./DynamicToolbar";
import { LoadingProvider } from "./PageMiddleware/LoadingMiddleware";

interface Props {
    children?: React.ReactNode;
}
export const AppFrame = observer((props: Props) => {

    const appFrame = useApplicationState().getAppFrame();

    const theme = useTheme();

    const router = useRouter();

    const drawerItems: DrawerItemProps[] = [
        {
            text: "Peperino",
            icon: <Home />,
            action: async () => {
                await router.push(KnownRoutes.Root())
            },
            childItems: [],
        },
        {
            text: "Demo",
            icon: <StreamSharp />,
            action: async () => {
                await router.push(KnownRoutes.Demo())
            },
            childItems: [],
        },
        {
            text: "Rooms",
            icon: <Groups />,
            action: async () => {
                await router.push(KnownRoutes.Room())
            },
            childItems: [],
        },
        {
            text: "Login",
            icon: <Login />,
            action: async () => {
                await router.push(KnownRoutes.Login())
            },
            childItems: [
                {
                    text: "Login3",
                    icon: <Login />,
                    action: async () => {
                        await router.push(KnownRoutes.Login())
                    },
                }
            ]
        },
    ];

    return (
        <div style={{ height: "100vh" }}>
            <LoadingProvider loading={appFrame.showLoading === "Full"}>
                <AppBar sx={{ zIndex: theme.zIndex.drawer + 1 }} position="fixed">
                    <DynamicToolbar menuClick={() => appFrame.drawerOpened = !appFrame.drawerOpened} />
                </AppBar>
                <Toolbar />
                <DynamicDrawer items={drawerItems} />
                <LoadingProvider loading={appFrame.showLoading === "Page"}>
                    {props.children}
                </LoadingProvider>
                <ToastContainer />
            </LoadingProvider>
        </div>
    );
});
