import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import EventIcon from "@mui/icons-material/Event"; 
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";



function EmployeeHome(props) {
  const { user: currentUser } = props;
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem('employeeId');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }
  }, []);


  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <EmployeeNavbar/>
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

        <Grid item xs={5}>
          <h2>Leaves</h2>
          <Card sx={{ backgroundColor: red[100], marginBottom: 4 }}>
            <CardContent>
              <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
                <LocalFloristIcon style={{ marginRight: "8px" }} />
                {/* Leave Balance: {leaveData.totalLeaves - leaveData.usedLeaves} */}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {/* Total Leaves: {leaveData.totalLeaves} */}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {/* Used Leaves: {leaveData.usedLeaves} */}
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
