"use client";

import { useAuthStore } from "@/app/(components)/state/authState";
import { KnownRoutes } from "@/lib/routing/knownRoutes";
import { Logout, Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppFrameStore } from "../../../(components)/state/appFrameState";
import { MenuDrawer } from "./components/MenuDrawer";
import { Titlebar } from "./components/Titlebar";

interface Props {
    children?: React.ReactNode;
}

export const AppFrame = ({ children }: Props) => {
    const appState = useAppFrameStore();
    const authState = useAuthStore();
    const router = useRouter();

    const menuItems = appState.menuItems;

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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
                        <MenuIcon />
                    </IconButton>
                    <Titlebar title={appState.title} />
                    {authState.isUserLoggedIn && (
                        <>
                            <IconButton onClick={handleOpenUserMenu}>
                                <Avatar src={authState.user?.photoURL ?? ""} />
                            </IconButton>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem
                                    onClick={async () => {
                                        await signOut(getAuth());
                                        handleCloseUserMenu();
                                        router.push(KnownRoutes.V2.Root());
                                        router.refresh();
                                    }}
                                >
                                    <Box display="flex" gap="10px">
                                        <Logout />
                                        <Typography textAlign="center">{"Logout"}</Typography>
                                    </Box>
                                </MenuItem>
                            </Menu>
                        </>
                    )}
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
