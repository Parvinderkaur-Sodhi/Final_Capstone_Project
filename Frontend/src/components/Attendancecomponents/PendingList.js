import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, } from '@material-ui/core';
import HrService from "../../services/hr.service";
import { makeStyles } from '@material-ui/core/styles';
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const useStyles = makeStyles({

  root: {
      "& .MuiTableCell-head": {
          color: "black",
          backgroundColor: "lightpink",
          fontWeight: "bold"
      },
  },

  pageBackground: {
    backgroundColor: "lightblue", 
    
  },
 
});

const PendingList = () => {
  const classes = useStyles();
  const [pendingAttendances, setPendingAttendances] = useState([]);

  useEffect(() => {
    fetchPendingAttendances();
  }, []);

  const fetchPendingAttendances = () => {
    HrService.getPendingAttendances()
      .then(data => {
        setPendingAttendances(data);
      })
      .catch(error => {
        console.error('Error fetching pending attendances:', error);
      });
  };

  const handleApproveAttendance = (attendanceId) => {
    HrService.approveAttendance(attendanceId)
      .then(() => {
        alert('Attendance approved successfully by HR.');
        fetchPendingAttendances(); 
      })
      .catch(error => {
        console.error('Error approving attendance:', error);
        alert('Error approving attendance. Please try again.');
      });
  };

  const handleRejectAttendance = (attendanceId) => {
    HrService.rejectAttendance(attendanceId)
      .then(() => {
        alert('Attendance rejected successfully by HR.');
        fetchPendingAttendances(); 
      })
      .catch(error => {
        console.error('Error rejecting attendance:', error);
        alert('Error rejecting attendance. Please try again.');
      });
  };

  return (
    <div className={classes.pageBackground}>
      <h2>
      Pending Attendance List
    
      </h2>
          
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow  className={classes.root}>
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {pendingAttendances.map(attendance => (
              <TableRow key={attendance.attendanceId} >
                <TableCell>{attendance.employee.employeeId}</TableCell>
                <TableCell>{attendance.employee.fname}</TableCell>
                <TableCell>{attendance.employee.lname}</TableCell>
                <TableCell>{formatDate(attendance.attendanceDate)}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleApproveAttendance(attendance.attendanceId)}>Approve</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleRejectAttendance(attendance.attendanceId)}>Reject</Button>
                  {attendance.approvalStatus === "REJECTED" && (
                    <Button variant="outlined" color="primary" onClick={() => {
                      const updatedReason = prompt("Enter new absence reason:");
                      if (updatedReason !== null) {
                        // can call edit absence reason function here
                      }
                    }}>
                      Edit Absence Reason
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PendingList;



















