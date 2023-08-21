import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { IconButton } from '@mui/material';

const Drawer = ({ open, onClose }) => {
  return (
    <MuiDrawer variant="persistent" anchor="left" open={open}>
      <div>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <List>
        <ListItem button component={RouterLink} to="/" onClick={onClose}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/profile" onClick={onClose}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </ListItem>
        {/* Add more navigation items */}
      </List>
    </MuiDrawer>
  );
};

export default Drawer;
