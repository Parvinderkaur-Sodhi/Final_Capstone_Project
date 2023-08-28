import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import EventIcon from "@mui/icons-material/Event";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";
import SmallCalendar from "../DashBoardComponents/SmallCalendar";
import EmployeeService from "../../services/employee.service";

function EmployeeHome(props) {
  const { user: currentUser } = props;

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const employeeId = localStorage.getItem('employeeId');
    if (employeeId) {
      EmployeeService.getLeaveRequestByEmployeeId(employeeId)
        .then((response) => {
          setLeaveRequests(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <EmployeeNavbar />
      <Card style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px", padding: "20px" }}>
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
                  WebDev
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={{ backgroundColor: blue[100], marginBottom: 4 }}>
              <CardContent>
                <Typography variant="h6">Data Analyst</Typography>
                <Typography variant="body1" color="textSecondary">
                  DataCorp
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Attendance Percentage */}

          <Grid item xs={6}>
            <Card sx={{ backgroundColor: blue[100], marginBottom: 4 }}>
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

          {/* Leaves */}
          <Grid item xs={6}>
            <Card sx={{ backgroundColor: red[100], marginBottom: 4 }}>
              <CardContent>
                <Typography variant="body1" color="textSecondary">
                  Your Leaves
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {/* Optional: Loading message */}
                  {isLoading ? "Loading..." : ""}
                </Typography>
                {/* Render SmallCalendar only if leaveRequests is an array */}
                {Array.isArray(leaveRequests) && (
                  <SmallCalendar leaveRequests={leaveRequests} />
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>

    </div>
  );
}

export default EmployeeHome;
