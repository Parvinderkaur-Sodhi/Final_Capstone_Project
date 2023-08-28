import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HrService from "../../services/hr.service";
import SmallCalendar from "../DashBoardComponents/SmallCalendar";
import { blue, green, red } from "@mui/material/colors";
import EventIcon from "@mui/icons-material/Event";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
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
      <Card style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px", padding: "14px" }}>
        <Grid container spacing={3}>
          {/* Saved Job Listings */}
          <Grid item xs={4}>
            <Card sx={{ backgroundColor: blue[100], marginBottom: 4 }}>
              <CardContent>
                <Typography variant="h6">Software Engineer</Typography>
                <Typography variant="body1" color="textSecondary">
                  TechCo
                </Typography>
              </CardContent>
            </Card>

          </Grid>

          {/* Job Offers */}
          <Grid item xs={4}>
            <Card sx={{ backgroundColor: green[100], marginBottom: 4 }}>
              <CardContent>
                <Typography variant="h6">Frontend Developer</Typography>
                <Typography variant="body1" color="textSecondary">
                  TechCo
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={{ backgroundColor: blue[100], marginBottom: 4 }}>
              <CardContent>
                {/* <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress
                  variant="determinate"
                  value={attendancePercentage}
                  size={100}
                  thickness={6}
                />
                </Box>
                &nbsp;&nbsp; */}
                <Typography variant="h6">
                  {attendancePercentage}%
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Attendance
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Attendance Percentage */}

          <Grid item xs={6}>
            <h3>Leaves</h3>
            <Card sx={{ backgroundColor: blue[100], marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Calendar
                </Typography>
                <SmallCalendar leaveRequests={leaveRequests} />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <h3>News and Events</h3>
            <Card sx={{ backgroundColor: red[100], marginBottom: 4 }}>
              <CardContent>
                <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
                  <EventIcon style={{ marginRight: "8px" }} />
                  {/* Attendance Percentage: {attendancePercentage.toFixed(2)}% */}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {/* Present Days: {attendanceData.presentDays} */}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {/* Total Working Days: {attendanceData.totalWorkingDays} */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}

export default HrHome;
