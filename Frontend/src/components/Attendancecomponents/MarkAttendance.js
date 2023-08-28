import React, { useState } from 'react';
import EmployeeService from '../../services/employee.service';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography, TextField } from "@mui/material";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";

const useStyles = makeStyles((theme) => ({
  pageBackground: {
    backgroundColor: "#f4f6f8",
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    minWidth: 300,
    maxWidth: 500,
    padding: theme.spacing(3),
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    marginTop: theme.spacing(2),
    backgroundColor: "#98144d", // Color code
    color: "white", // Text color
    "&:hover": {
      backgroundColor: "#800f3e", // Hover color
    },
  },
  welcomeHeading: {
    fontWeight: 'bold',
    textAlign: "center"
  },
  welcomeMessage: {
    fontStyle: "italic",
    padding: theme.spacing(2, 0),
    marginBottom: theme.spacing(3),
    fontSize: "1.2rem",
    color: "#555",
    textAlign: "center",
  },
}));

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
    <Card style={{ maxHeight: "100vh", overflowY: "auto", paddingRight: "17px", padding: "20px" }}>
     <div className={classes.pageBackground}>
      <EmployeeNavbar /> 
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.welcomeHeading} variant="h5" gutterBottom>
            Welcome to the Attendance Log!
          </Typography>
          <Typography className={classes.welcomeMessage} variant="body1" gutterBottom>
            Thank you for being an essential part of our team.
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
          <Button
            onClick={handleMarkAttendance}
            className={classes.button}
            variant="contained"
          >
            Mark Attendance
          </Button>
        </CardContent>
      </Card>
    </div>
    </Card>
  );
};

export default MarkAttendance;









