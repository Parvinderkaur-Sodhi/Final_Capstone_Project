import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, ListItemIcon, Menu, MenuItem } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';

function ProfileNavigationItem(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    // Retrieve user information from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user ? user.username : '';

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemIcon  sx={{ color: '#fff', fontSize: '30px'}}>
                    <AccountCircleIcon sx={{ color: '#fff', fontSize: '40px'}}/>
                </ListItemIcon>
                {/* <ListItemText primary="Profile" sx={{ color: '#fff', fontSize: '16px' }} />
                <ExpandMoreIcon sx={{ color: '#fff', fontSize: '24px' }} /> */}
            </ListItem>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} sx={{ display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #ccc' }}>
                    <strong sx={{ fontSize: '20px', marginRight: '16px' }}>Hello, {username}</strong>
                </MenuItem>
                <MenuItem component={Link} to="/profile" onClick={handleClose} sx={{ fontSize: '16px' }}>
                    <ListItemIcon sx={{ marginRight: '8px' }}>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <Link to={"/profile"}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => { handleClose(); props.logOut(); }} sx={{ fontSize: '16px' }}>
                    <ListItemIcon sx={{ marginRight: '8px' }}>
                        <ExitToAppIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    );
}

export default ProfileNavigationItem;
