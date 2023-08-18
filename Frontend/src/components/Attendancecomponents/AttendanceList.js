import React, {useState, useEffect} from "react";
import { Redirect, Link } from "react-router-dom";
import HrService from "../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
}


function AttendanceList(props){
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
        <div>
            <h2>Attendance List</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Attendance Date</TableCell>
                            <TableCell>Present</TableCell>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Absence Reason</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {attendance.map((attendance) =>(
                            <TableRow key={attendance.attendanceId}>
                                <TableCell>{attendance.attendanceId}</TableCell>
                                <TableCell>{formatDate(attendance.attendanceDate)}</TableCell>
                                <TableCell>{attendance.present}</TableCell>
                                <TableCell>{attendance.employee.employeeId}</TableCell>
                                <TableCell>{attendance.absenceReason}</TableCell>
                                <TableCell>
                                    <Button
                                            variant="outlined"
                                            color="primary"
                                            component={Link}
                                            to={`/updateAttendance/${attendance.attendanceId}`}
                                    >
                                            EDIT
                                    </Button>


                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AttendanceList;