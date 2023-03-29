import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useState } from "react";
import { MenuAction } from "../../lib/appFrame/Action";

interface Props {
    actions: MenuAction[];
}

export const ContextAction = observer((props: Props) => {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    if (props.actions.length === 1) {
        const contextAction = props.actions[0];
        return (
            <IconButton onClick={contextAction.action} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                {contextAction.icon}
            </IconButton>
        );
    }

    return (
        <>
            <IconButton onClick={handleOpenUserMenu} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                <MoreVert />
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
                {props.actions.map((action) => (
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
});
