import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
  CircularProgress,
  Box,
  Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HrService from "../../services/hr.service";
import SmallCalendar from "../DashBoardComponents/SmallCalendar";
import HrNavbar from "../DashBoardComponents/HrNavbar";

function HrHome(props) {
  const { user: currentUser } = props;
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(85); // Sample data
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    HrService.getAllLeaveRequests()
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleNotificationOpen = () => {
    setNotificationOpen(true);
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <HrNavbar />
      {/* Notification Bar */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        p={2}
        position="fixed"
        width="100%"
        zIndex={100}
      >
        <IconButton
          color="primary"
          aria-label="notification"
          onClick={handleNotificationOpen}
        >
          <NotificationsIcon />
        </IconButton>
      </Box>
      <Divider />
      {/* Notification Content */}
      {notificationOpen && (
        <Box p={2} bgcolor="lightgrey" zIndex={99}>
          This is a sample notification.
        </Box>
      )}
      <Divider />
      <Grid container spacing={4}>
        {/* Small Calendar */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calendar
              </Typography>
              <SmallCalendar leaveRequests={leaveRequests} />
            </CardContent>
          </Card>
        </Grid>
        {/* Attendance */}
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attendance
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress
                  variant="determinate"
                  value={attendancePercentage}
                  size={100}
                  thickness={6}
                />
                &nbsp;&nbsp;
                <Typography variant="h6" gutterBottom>
                  {attendancePercentage}% Attendance
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default HrHome;
