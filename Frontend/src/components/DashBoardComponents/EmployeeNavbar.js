import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from '@mui/icons-material/People';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import WorkIcon from '@mui/icons-material/Work';
import { IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const SidebarWrapper = styled('div')({
  position: 'fixed',
  top: '70px',
  left: '0',
  width: '80px',
  height: '100%',
  backgroundColor: "#98144d",
  color: "white",
  transition: 'width 0.3s, transform 0.3s',
  zIndex: 1000,
  paddingTop: '20px',
  overflowX: 'hidden',
});

const SidebarIconWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
});

const linkStyles = {
    color: 'white',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
  };

  const iconStyles = {
    marginRight: '10px',
  };

const EmployeeNavbar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <SidebarWrapper style={{ width: open ? '240px' : '60px' }}>
      <IconButton onClick={handleDrawerToggle}>
        {open ? (
          <ChevronLeftIcon style={{ color: 'white' }} />
        ) : (
        <div  style={{ color: 'white' }} >
          <MenuIcon style={{ color: 'white' }} />
          <br></br>
          <br></br>
          <InboxIcon style={iconStyles} />
          <AccountCircleIcon style={iconStyles} />
          <EventIcon style={iconStyles} />
          <AssignmentIcon style={iconStyles} />
          <LocalLibraryIcon style={iconStyles} />
          <BookmarkIcon style={iconStyles} />
          <BookmarkIcon style={iconStyles} />
          <MailIcon style={iconStyles} />
          </div>
        )}
      </IconButton>
      <br></br>
      <br></br>
      {open && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>
            <RouterLink to="/employee-home" style={linkStyles}>
              <InboxIcon style={iconStyles} />
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/emp-details" style={linkStyles}>
              <AccountCircleIcon style={iconStyles} />
              Details
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/your-attendance/:employeeId" style={linkStyles}>
            <EventIcon style={iconStyles} />
               Attendance
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/leave-request-user" style={linkStyles}>
            <AssignmentIcon style={iconStyles} />
              Leave Requests
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/leave-balance-user" style={linkStyles}>
            <LocalLibraryIcon style={iconStyles} />
              Leave Balances
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/leave-types-user" style={linkStyles}>
            <BookmarkIcon style={iconStyles} />
              Leave Types
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/EmpJobPortal/2" style={linkStyles}>
            <WorkIcon style={iconStyles} />
              Browse Jobs
            </RouterLink>
          </li>
           <li>
            <RouterLink to="/TrackStatus/2" style={linkStyles}>
            <WorkIcon style={iconStyles} />
              Applied Jobs
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/dev" style={linkStyles}>
              <MailIcon style={iconStyles} />
              Contact Us
            </RouterLink>
          </li>
        </ul>
      )}
    </SidebarWrapper>
  );
};

export default EmployeeNavbar;
