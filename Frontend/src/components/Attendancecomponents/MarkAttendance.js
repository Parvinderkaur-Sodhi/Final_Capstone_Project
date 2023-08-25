import React, { useState } from 'react';
import EmployeeService from '../../services/employee.service';
//import {  Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography, TextField } from "@mui/material";
//import SideNavbar from '../DashBoardComponents/SideNavbar'; // Import the SideNavbar component
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";

const useStyles = makeStyles({
  root: {
    "& .MuiTableCell-head": {
      color: "black",
      backgroundColor: "lightpink",
      fontWeight: "bold"
    },
  },
  pageBackground: {
    backgroundColor: "#98144d", 
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    minWidth: 300,
    maxWidth: 500,
    padding: "20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    marginTop: "10px",
  },

  welcomeMessage: {
    
    fontStyle: "italic",
    marginBottom: "20px",
    fontSize: "1.2rem",
    color: "#555",
    textAlign: "center",
  },
});

const MarkAttendance = () => {
  const classes = useStyles();
  const [employeeId, setEmployeeId] = useState('');
  

  const handleMarkAttendance = () => {
    const attendanceData = {
     
      present: 'present', 
     
    };

    EmployeeService.markAttendance(employeeId, attendanceData)
      .then(() => {
        alert('Attendance marked successfully. It will be approved/rejected by HR later.');
        
      })
      .catch(error => {
        console.error('Error marking attendance:', error);
        alert('Error marking attendance. Please try again.');
      });
  };

  return (
    <div className={classes.pageBackground}>
    <EmployeeNavbar /> 
    <Card className={classes.card}>
      <CardContent>
        <Typography style={{ fontWeight: 'bold' }} className={classes.welcomeHeading} variant="h5" gutterBottom>
          Welcome to the Attendance Log!
        </Typography>
        <Typography className={classes.welcomeMessage} variant="body1" gutterBottom>
          Please take a moment to mark your attendance for today by writing your appropriate employee ID. Your punctuality and dedication are greatly appreciated. Remember, your timely attendance keeps the wheels of productivity turning. Thank you for being an essential part of our team.
        </Typography>
        <div>
          <TextField
            label="Employee ID"
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            fullWidth
            variant="outlined"
            margin="normal"
          />
        </div>
        <Button onClick={handleMarkAttendance} className={classes.button} variant="contained" color="primary">
          Mark Attendance
        </Button>
       
      </CardContent>
    </Card>
  </div>
  );
};

export default MarkAttendance;








