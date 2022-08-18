import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useAppFrameConfig } from "../../lib/appFrame/useAppFrameConfig";

export const UserAvatarMenu = () => {
    const [user, loading, error] = useAuthState(getAuth());
    const router = useRouter();
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const appFrameConfig = useAppFrameConfig();

    return (
        <>
            <IconButton onClick={handleOpenUserMenu} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                {appFrameConfig.userAvatarIcon}
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {appFrameConfig.userAvatarActions?.map((action) => (
                    <MenuItem key={action.text} onClick={async () => {
                        !action.keepMenuOpen && handleCloseUserMenu();
                        await action.action();
                    }}>
                        <Box display="flex" gap="10px">
                            {action.icon}
                            <Typography textAlign="center">{action.text}</Typography>
                        </Box>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}