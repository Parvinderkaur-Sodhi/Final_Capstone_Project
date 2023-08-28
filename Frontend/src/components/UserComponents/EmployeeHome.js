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

  // State for leave requests and loading
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem('employeeId');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }
  }, []);

  useEffect(() => {
    if (employeeId) {
      EmployeeService.getLeaveRequestById(employeeId)
        .then((response) => {
          console.log(response.data); // Log the response data
          setLeaveRequests(response.data.leaveRequests); // Use the array property
          setIsLoading(false); // Data fetched, loading complete
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false); // Error occurred, loading complete
        });
    }
  }, [employeeId]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <EmployeeNavbar />
      <Card style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px", padding: "20px" }}>
        <Card style={{ padding: 20 }}>

      <Grid container spacing={3}>
          {/* Greeting */}
          <Grid item xs={10}>
            <Card sx={{ backgroundColor: red[100], marginBottom: 4 }}>
              <CardContent>
                <Typography variant="h6" color="textPrimary">
                  Hello!!!!! (Greetings)
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* Saved Job Listings */}
          <Grid item xs={3}>
            <h2>Saved Job</h2>
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
          <Grid item xs={3}>
            <h2>Job Offers</h2>
            <Card sx={{ backgroundColor: green[100], marginBottom: 4 }}>
              <CardContent>
                <Typography variant="h6">Frontend Developer</Typography>
                <Typography variant="body1" color="textSecondary">
                  WebDev
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <h2>Job Applied </h2>
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

          <Grid item xs={5}>
            <h2>Attendance</h2>
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
          <Grid item xs={5}>
            <h2>Leaves</h2>
            <Card sx={{ backgroundColor: red[100], marginBottom: 4 }}>
              <CardContent>
                <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
                  <LocalFloristIcon style={{ marginRight: "8px" }} />
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {/* ... (leave-related text) */}
                </Typography>
                {/* Conditional rendering based on loading state */}
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <div>
                    {Array.isArray(leaveRequests) && (
                      <SmallCalendar leaveRequests={leaveRequests} />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
      </Card>

    </div>
  );
}

export default EmployeeHome;
