import * as React from 'react';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import faceImage from "./face.jpg";
import { useUiState } from "../../context/UiContext";

export const UserMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const {setOpenAppDataManagementModal} = useUiState();
    const handleOpenAppDataManagement = () => setOpenAppDataManagementModal(true);

    const handleOpenUserMenu = (e) => {
        setAnchorElUser(e.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar src={faceImage}/>
                </IconButton>
            </Tooltip>
            <Menu
                sx={{mt: '45px'}}
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
                <MenuItem onClick={handleOpenAppDataManagement}>
                    <Typography sx={{ textAlign: "center" }}>Manage Data</Typography>
                </MenuItem>
            </Menu>
        </>
    );
}
