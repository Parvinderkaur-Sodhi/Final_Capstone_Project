import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import HrService from "../../services/hr.service";
import Pagination from "@mui/material/Pagination";
import HrNavbar from '../DashBoardComponents/HrNavbar';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "white",
    padding: theme.spacing(2),
    color: 'black',
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
    backgroundColor: '#98144d',
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
  const [searchQuery, setSearchQuery] = useState('');


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
  //const currentRecords = pendingAttendances.slice(indexOfFirstRecord, indexOfLastRecord);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecords = pendingAttendances.filter((attendance) =>
  attendance.employee.username.toLowerCase().includes(searchQuery.toLowerCase())
);

const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  


  return (
    <Card style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px", padding: "20px" }}>
    <div>

   
    <HrNavbar />
    <div>
      
      <Card className={classes.card} >
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
              {/* Search input */}
        
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ fontSize: '16px' }} // Adjust the font size as needed
        />
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
      {currentRecords.map((attendance) => {
        if (!searchQuery || attendance.employee.username.toLowerCase().includes(searchQuery.toLowerCase())) {
          return (
            <TableRow key={attendance.attendanceId}>
              <TableCell>{attendance.employee.employeeId}</TableCell>
              <TableCell>{attendance.employee.username}</TableCell>
              <TableCell>{formatDate(attendance.attendanceDate)}</TableCell>
              <TableCell className={classes.actionButtons}>
                <Button variant="contained" color="primary" onClick={() => handleApproveAttendance(attendance.attendanceId)}  style={{ backgroundColor: 'green' }}>Approve</Button>
                <Button variant="contained" color="secondary" onClick={() => handleRejectAttendance(attendance.attendanceId)}>Reject</Button>
                {attendance.approvalStatus === 'REJECTED' && (
                  <Button variant="outlined" color="primary">
                    Edit Absence Reason
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        } else {
          return null; // Exclude this record from rendering
        }
      })}
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
    </Card>
  );
};

export default PendingList;





















