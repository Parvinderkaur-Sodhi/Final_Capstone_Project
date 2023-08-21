import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Drawer from './Drawer'; // Create this component
import { Box } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  background: theme.palette.background.paper,
}));

const Navbar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            HR Dashboard
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <Drawer open={open} onClose={handleDrawerClose} />
    </>
  );
};

export default Navbar;
