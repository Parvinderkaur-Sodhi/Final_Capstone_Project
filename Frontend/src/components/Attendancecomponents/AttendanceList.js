import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import HrService from "../../services/hr.service";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import HrNavbar from "../DashBoardComponents/HrNavbar";
import Pagination from "@mui/material/Pagination";

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
  const [attendance, setAttendance] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const { user: currentUser } = props;

  useEffect(() => {
    HrService.getAllAttendances()
      .then((response) => {
        setAttendance(response.data);
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
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
              {currentRecords.map((attendanceItem) => (
                <TableRow key={attendanceItem.attendanceId}>
                  <TableCell>{attendanceItem.attendanceId}</TableCell>
                  <TableCell>
                    {formatDate(attendanceItem.attendanceDate)}
                  </TableCell>
                  <TableCell>{attendanceItem.present}</TableCell>
                  <TableCell>
                    {attendanceItem.employee.employeeId}
                  </TableCell>
                  <TableCell>{attendanceItem.employee.username}</TableCell>
                  <TableCell>{attendanceItem.absenceReason}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.editButton}
                      component={Link}
                      to={`/updateAttendance/${attendanceItem.attendanceId}`}
                    >
                      EDIT
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={Math.ceil(attendance.length / recordsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Paper>
    </div>
  );
}

export default AttendanceList;