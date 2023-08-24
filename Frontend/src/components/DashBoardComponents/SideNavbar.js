import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Schedule as ScheduleIcon,
  AttachMoney as AttachMoneyIcon,
  Work as WorkIcon,
  Equalizer as EqualizerIcon,
  School as SchoolIcon,
  Event as EventIcon,
  LocalHospital as LocalHospitalIcon,
  Policy as PolicyIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Person as PersonIcon,
  ExitToApp as ExitToAppIcon,
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
    backgroundColor: "#98144d",
    color: "white",
    backgroundColor: "black",
    color: "white",
    backgroundColor: "lightblue",
    color: "black",
  },
  toolbar: theme.mixins.toolbar,
}));

function SideNavbar() {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={isOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Employees" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ScheduleIcon />
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Payroll" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText primary="Recruitment" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EqualizerIcon />
            </ListItemIcon>
            <ListItemText primary="Performance" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Training" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <LocalHospitalIcon />
            </ListItemIcon>
            <ListItemText primary="Benefits" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <PolicyIcon />
            </ListItemIcon>
            <ListItemText primary="Policies" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Help" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>
  <main>
      <button onClick={toggleDrawer}>Toggle Drawer</button>
    </main>
  </div>
  );
}

export default SideNavbar;
