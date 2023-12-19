"use client";
import { Menu } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { useAppFrameStore } from "../../../(components)/state/appFrameState";
import { MenuDrawer } from "./components/MenuDrawer";
import { Titlebar } from "./components/Titlebar";

interface Props {
    children?: React.ReactNode;
}

export const AppFrame = ({ children }: Props) => {
    const appState = useAppFrameStore();

    const menuItems = appState.menuItems;

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        onClick={() => appState.setMenuOpened(true)}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Titlebar title={appState.title} />
                </Toolbar>
            </AppBar>
            <MenuDrawer
                onClick={async (item) => {
                    if (item.childItems) {
                        appState.toggleMenuItemOpened(menuItems.indexOf(item));
                    } else {
                        await item.action?.();
                    }
                }}
                onClose={() => appState.setMenuOpened(false)}
                opened={appState.menuOpened}
                items={menuItems}
            />
            {children}
        </>
    );
};
