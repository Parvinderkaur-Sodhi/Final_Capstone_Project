import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import HrService from "../../services/hr.service";
import {  Table,  TableContainer,  TableHead,  TableBody,  TableCell,  TableRow,  Paper,  Button,  Typography,  Card,} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import HrNavbar from "../DashBoardComponents/HrNavbar";
import Pagination from "@mui/material/Pagination";


const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const useStyles = makeStyles({
 
  card: {
    backgroundColor: "white",
    width: "100%",
    padding: "24px", 
    borderRadius: "8px", 
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  table: {
    minWidth: "650px", 
  },
  editButton: {
    backgroundColor: "#98144d",
    color: "white",
    "&:hover": {
      backgroundColor: "#800c3d",
    },
  },

  tableHeaderCell: {
    color: 'black',
    backgroundColor: 'lightgrey',
    fontWeight: 'bold',
  },
});


function AttendanceList(props) {
  const classes = useStyles();
  const [attendance, setAttendance] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);
  const { user: currentUser } = props;
  const [searchQuery, setSearchQuery] = useState('');


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
  

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const filteredAttendance = attendance.filter((attendanceItem) =>
  attendanceItem.employee.username.toLowerCase().includes(searchQuery.toLowerCase())
);

const currentRecords = filteredAttendance.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <Card style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px", padding: "20px" }}>
    
      
      <HrNavbar />

      <Typography variant="h4" gutterBottom>
        Attendance List
      </Typography>

    <input
      type="text"
      placeholder="Search by name..."
      value={searchQuery}
      onChange={handleSearchChange}
      style={{
      fontSize: '16px',
      marginBottom: '10px',
      width: '50%',
      textAlign: 'left',  
      }}
    />


      <Paper className={classes.card}>
        <TableContainer>
          <Table className={classes.table} aria-label="attendance table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>ID</TableCell>
                <TableCell className={classes.tableHeaderCell}>Date</TableCell>
                <TableCell className={classes.tableHeaderCell}>Status</TableCell>
                <TableCell className={classes.tableHeaderCell}>Employee ID</TableCell>
                <TableCell className={classes.tableHeaderCell}>Name</TableCell>
                <TableCell className={classes.tableHeaderCell}>Absence Reason</TableCell>
                <TableCell className={classes.tableHeaderCell}>Actions</TableCell>
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
      
    
    </Card>
  );
}

export default AttendanceList;