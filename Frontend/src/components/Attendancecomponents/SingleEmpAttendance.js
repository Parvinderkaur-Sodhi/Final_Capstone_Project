import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import EmployeeService from "../../services/employee.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Pagination } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const useStyles = makeStyles((theme) => ({
  pageBackground: {
    backgroundColor: "#f4f6f8",
    minHeight: "80vh",
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
  redText: {
    color: "red",
  },
  introText: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function SingleEmpAttendance(props) {
  const classes = useStyles();
  const [attendance, setAttendance] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const employeeId = localStorage.getItem("employeeId");
  const { user: currentUser } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5; // Number of records to display per page

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = attendance.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    EmployeeService.getAttendanceByEmployeeId(employeeId)
      .then((response) => {
        setAttendance(response.data);

        const presentDays = response.data.filter(
          (record) => record.present.toLowerCase() === "present"
        ).length;
        const percentage = (presentDays / response.data.length) * 100 || 0;
        setAttendancePercentage(percentage);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId]);

  let attendanceStatus = "Good";
  if (attendancePercentage < 50) {
    attendanceStatus = "Poor";
  }

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  const handleEditAbsenceReason = (attendanceId, updatedReason) => {
    EmployeeService.updateAbsenceReason(attendanceId, updatedReason)
      .then(() => {
        alert("Absence reason updated successfully.");

        setAttendance((prevAttendance) =>
          prevAttendance.map((record) =>
            record.attendanceId === attendanceId
              ? { ...record, absenceReason: updatedReason }
              : record
          )
        );
      })
      .catch((error) => {
        console.error("Error updating absence reason:", error);
        alert("Error updating absence reason. Please try again.");
      });
  };
  

  return (
    <div className={classes.pageBackground}>
      <EmployeeNavbar />
  
      <Typography variant="h4" gutterBottom style={{ color: "#98144d" }}>
        Your Attendance Details
      </Typography>
  
      <Paper className={classes.card}>
        <Typography variant="h6" gutterBottom  style={{ color: "#98144d" }}>
          Employee ID: {employeeId}
        </Typography>

        <Button
      variant="contained"
      color="primary"
      style={{ backgroundColor: "#98144d", color: "white", marginTop: "16px" }}
      component={Link}
      to="/mark-attendance"
    >
      Mark Attendance
    </Button>
    {/* <Typography className={classes.introText}>
          We value your commitment and punctuality. Your consistent attendance and dedication to your role contribute significantly to our team's success. By being present and engaged, you help maintain a productive work environment and contribute to the achievement of our goals. Thank you for your ongoing efforts, and we look forward to your continued active participation and contributions.
        </Typography> */}
        
  
        <Typography style={attendancePercentage < 50 ? { color: "red" } : {}}>
          Attendance Percentage: {attendancePercentage.toFixed(2)}%
        </Typography>
  
        <Typography>
          Attendance Status: {attendanceStatus}
        </Typography>
  
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "lightgrey" }}>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Absence Reason</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentRecords.map((attendanceRecord) => (
                <TableRow key={attendanceRecord.attendanceId}>
                  <TableCell>{formatDate(attendanceRecord.attendanceDate)}</TableCell>
                  <TableCell>{attendanceRecord.present}</TableCell>
                  <TableCell>{attendanceRecord.absenceReason}</TableCell>
                  <TableCell>
                    {attendanceRecord.approvalStatus === "REJECTED" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          const updatedReason = prompt("Enter new absence reason:");
                          if (updatedReason !== null) {
                            handleEditAbsenceReason(
                              attendanceRecord.attendanceId,
                              updatedReason
                            );
                          }
                        }}
                      >
                        Edit Absence Reason
                      </Button>
                    )}
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
        color="primary"
      />
      </Paper>
    </div>
  );
  
}

export default SingleEmpAttendance;
