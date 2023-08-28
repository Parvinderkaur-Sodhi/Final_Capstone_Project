import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";
import EmployeeService from "../../services/employee.service";
import { makeStyles } from "@mui/styles"; // Import makeStyles
import SmallCalendar from "../DashBoardComponents/SmallCalendar";

const useStyles = makeStyles((theme) => ({
  attendanceCard: {
    backgroundColor: blue[100],
    padding: 16, // Use numeric value instead of theme.spacing
    borderRadius: 8, // Use numeric value instead of theme.spacing
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  attendanceStatus: {
    color: "#fff",
    backgroundColor: (props) =>
      props.attendanceStatus === "Poor" ? "red" : "green",
    padding: 8, // Use numeric value instead of theme.spacing
    borderRadius: 8, // Use numeric value instead of theme.spacing
    display: "inline-block",
  },
}));

function EmployeeHome(props) {
  const { user: currentUser } = props;

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [attendanceStatus, setAttendanceStatus] = useState(""); // Default status
  const employeeId = localStorage.getItem("employeeId");
  const classes = useStyles({ attendanceStatus });

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

  useEffect(() => {
    EmployeeService.getAttendanceByEmployeeId(employeeId)
      .then((response) => {
        const presentDays = response.data.filter(
          (record) => record.present.toLowerCase() === "present"
        ).length;
        const percentage = (presentDays / response.data.length) * 100 || 0;
        setAttendancePercentage(percentage);

        // Determine attendance status
        if (percentage < 50) {
          setAttendanceStatus("Poor");
        } else {
          setAttendanceStatus("Good");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId]);

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

          {/* Attendance Percentage */}
          <Grid item xs={6}>
            <Card className={classes.attendanceCard}>
              <CardContent>
                <Typography variant="h5" style={{ marginBottom: "16px" }}>
                  <strong>Your Attendance Details</strong>
                </Typography>
                <Typography variant="h6" style={{ marginBottom: "8px" }}>
                  Attendance Percentage: {attendancePercentage.toFixed(2)}%
                </Typography>
                <Typography variant="subtitle1">
                  Attendance Status:{" "}
                  <span className={classes.attendanceStatus}>
                    {attendanceStatus}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div >
  );
}

export default EmployeeHome;
