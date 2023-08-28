import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import EventIcon from "@mui/icons-material/Event"; 
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";
import EmployeeService from "../../services/employee.service";
import { makeStyles } from "@mui/styles"; // Import makeStyles

// function EmployeeHome(props) {
//   const { user: currentUser } = props;
//   const [employeeId, setEmployeeId] = useState(null);

//   useEffect(() => {
//     const storedEmployeeId = localStorage.getItem('employeeId');
//     if (storedEmployeeId) {
//       setEmployeeId(storedEmployeeId);
//     }
//   }, []);


//   if (!currentUser) {
//     return <Redirect to="/login" />;
//   }

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
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [attendanceStatus, setAttendanceStatus] = useState(""); // Default status
  const employeeId = localStorage.getItem("employeeId");
  const classes = useStyles({ attendanceStatus }); 

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
      <EmployeeNavbar/>
      <Card style={{ padding: 5 }}>

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
          <h2>Saved Job </h2>
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
         
        
         <Grid item xs={12} sm={6}>
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

    </div>
  );
}

export default EmployeeHome;
