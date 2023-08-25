import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import HrService from "../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Pagination } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import HrNavbar from "../DashBoardComponents/HrNavbar";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const useStyles = makeStyles((theme) => ({
  pageBackground: {
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(3),
  },
  card: {
    backgroundColor: "white",
    width: "100%",
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  table: {
    minWidth: 650,
  },
  editButton: {
    backgroundColor: "#98144d", // Updated button color
    color: "white",
    "&:hover": {
      backgroundColor: "#800c3d", // Darker shade on hover
    },
  },
}));

function AttendanceList(props) {
  const classes = useStyles();
  const [attendance, setAttendances] = useState([]);
  const { user: currentUser } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Number of records to display per page

  useEffect(() => {
    HrService.getAllAttendances()
      .then((response) => {
        setAttendances(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = attendance.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={classes.pageBackground}>
      <HrNavbar />

      <Typography variant="h4" gutterBottom>
        Attendance List
      </Typography>

      <Paper className={classes.card}>
        <TableContainer>
          <Table className={classes.table} aria-label="attendance table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Absence Reason</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {attendance.map((attendance, index) => {
                const rowClass = index % 2 === 0 ? classes.evenRow : classes.oddRow;
                return (
                  <TableRow key={attendance.attendanceId} className={rowClass}>
                    <TableCell>{attendance.attendanceId}</TableCell>
                    <TableCell>{formatDate(attendance.attendanceDate)}</TableCell>
                    <TableCell>{attendance.present}</TableCell>
                    <TableCell>{attendance.employee.employeeId}</TableCell>
                    <TableCell>{attendance.employee.username}</TableCell>
                    <TableCell>{attendance.absenceReason}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.editButton}
                        component={Link}
                        to={`/updateAttendance/${attendance.attendanceId}`}
                      >
                        EDIT
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(attendance.length / recordsPerPage)}
          page={currentPage}
          onChange={(event, page) => paginate(page)}
          color="primary"
          className={classes.pagination}
        />
      </Paper>
    </div>
  );
}

export default AttendanceList;


