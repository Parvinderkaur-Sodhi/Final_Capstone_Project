import React, {useState, useEffect} from "react";
import { Redirect, Link } from "react-router-dom";
import HrService from "../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

const useStyles = makeStyles({

    root: {
        "& .MuiTableCell-head": {
            color: "black",
            backgroundColor: "white",
            fontWeight: "bold"
        },
    },

    pageBackground: {
        backgroundColor: "#98144d", 
      },

    evenRow: {
        backgroundColor: "lightgray", 
    },

    oddRow: {
        backgroundColor: "white", 
    },
   
  });
  


function AttendanceList(props){
    const classes = useStyles();
    const [attendance, setAttendances]=useState([]);
    const {user: currentUser}=props;
    useEffect(() =>{
        HrService.getAllAttendances()
       .then((response) =>{
        console.log("Attendance Data:", response.data);
        setAttendances(response.data);
       })
       .catch((error) =>{
        console.log(error);
       });
    }, []);

    if(!currentUser){
        return <Redirect to="/login" />;
    }

  
    return(
        <div className={classes.pageBackground}>
            
            <h2 style={{ padding: "10px", color: "black", textAlign: "center" }}>Attendance List</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow className={classes.root}>
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
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
                                    <TableCell>{attendance.employee.fname}</TableCell>
                                    <TableCell>{attendance.employee.lname}</TableCell>
                                    <TableCell>{attendance.absenceReason}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
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
        </div>
    );
}
export default AttendanceList;


