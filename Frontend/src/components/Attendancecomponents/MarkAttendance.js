import React, { useState } from 'react';
import EmployeeService from '../../services/employee.service';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardContent, Typography, TextField } from "@mui/material";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
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
    padding: "16px", 
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  button: {
    marginTop: "8px", 
    backgroundColor: "#98144d",
    color: "white",
    "&:hover": {
      backgroundColor: "#800f3e",
    },
  },
  welcomeHeading: {
    fontWeight: 'bold',
    textAlign: "center",
  },
  welcomeMessage: {
    fontStyle: "italic",
    padding: "8px 0", 
    marginBottom: "16px", 
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
        toast.success('Attendance marked successfully. It will be approved/rejected by HR later.');
      })
      .catch(error => {
        console.error('Error marking attendance:', error);
        toast.error('Error marking attendance. Please try again.');
      });
  };

  return (
    <Card style={{ maxHeight: "100vh", overflowY: "auto", paddingRight: "17px", padding: "20px" }}>
     <div className={classes.pageBackground}>
      <EmployeeNavbar /> 
      {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}
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









