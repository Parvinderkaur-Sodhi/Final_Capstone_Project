import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import HrService from "../../services/hr.service";
<<<<<<< HEAD
import Pagination from "@mui/material/Pagination";
import HrNavbar from '../DashBoardComponents/HrNavbar';
=======
import HrNavbar from "../DashBoardComponents/HrNavbar";
>>>>>>> 56091c11b92794fa3b7eb34de07a3504b84650b0

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "#98144d",
    padding: theme.spacing(3),
    color: 'white',
    position: 'relative',
  },
  tableContainer: {
    marginTop: theme.spacing(3),
  },
  tableHeaderCell: {
    color: 'black',
    backgroundColor: 'lightgrey',
    fontWeight: 'bold',
  },
  actionButtons: {
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
  viewAttendanceButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(3),
  },
}));

const PendingList = () => {
  const classes = useStyles();
  const [pendingAttendances, setPendingAttendances] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  useEffect(() => {
    fetchPendingAttendances();
  }, [currentPage]);

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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = pendingAttendances.slice(indexOfFirstRecord, indexOfLastRecord);


  return (
    <div>

<<<<<<< HEAD
   
    <HrNavbar />
    <div>
=======
    <HrNavbar />
    <Card className={classes.card}>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/attendance-list"
        className={classes.viewAttendanceButton}
      >
        View Attendance List
      </Button>
      <h2>Pending Attendance List</h2>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Employee ID</TableCell>
              <TableCell className={classes.tableHeaderCell}>Name</TableCell>
              <TableCell className={classes.tableHeaderCell}>Date</TableCell>
              <TableCell className={classes.tableHeaderCell}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingAttendances.map((attendance) => (
              <TableRow key={attendance.attendanceId}>
                <TableCell>{attendance.employee.employeeId}</TableCell>
                <TableCell>{attendance.employee.username}</TableCell>
                <TableCell>{formatDate(attendance.attendanceDate)}</TableCell>
                <TableCell className={classes.actionButtons}>
                  <Button variant="contained" color="primary" onClick={() => handleApproveAttendance(attendance.attendanceId)}>Approve</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleRejectAttendance(attendance.attendanceId)}>Reject</Button>
                  {attendance.approvalStatus === 'REJECTED' && (
                    <Button variant="outlined" color="primary">
                      Edit Absence Reason
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
>>>>>>> 56091c11b92794fa3b7eb34de07a3504b84650b0
      
      <Card className={classes.card}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/attendance-list"
          className={classes.viewAttendanceButton}
        >
          View Attendance List
        </Button>
        <h2>Pending Attendance List</h2>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>Employee ID</TableCell>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>Date</TableCell>
                <TableCell className={classes.tableHeaderCell}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRecords.map((attendance) => (
                <TableRow key={attendance.attendanceId}>
                  <TableCell>{attendance.employee.employeeId}</TableCell>
                  <TableCell>{attendance.employee.username}</TableCell>
                  <TableCell>{formatDate(attendance.attendanceDate)}</TableCell>
                  <TableCell className={classes.actionButtons}>
                    <Button variant="contained" color="primary" onClick={() => handleApproveAttendance(attendance.attendanceId)}>Approve</Button>
                    <Button variant="contained" color="secondary" onClick={() => handleRejectAttendance(attendance.attendanceId)}>Reject</Button>
                    {attendance.approvalStatus === 'REJECTED' && (
                      <Button variant="outlined" color="primary">
                        Edit Absence Reason
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination component */}
        <div className={classes.pagination}>
          <Pagination
            count={Math.ceil(pendingAttendances.length / recordsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
          />
        </div>
      </Card>
    </div>
    </div>
  );
};

export default PendingList;





















