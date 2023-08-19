import React, {useState, useEffect} from "react";
import { Redirect,  useParams } from "react-router-dom";
import EmployeeService from "../../services/employee.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


function formatDate(dateString) {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

function SingleEmpAttendance(props){
	const {employeeId}=useParams();
	const [attendance, setAttendance]=useState([]);
	const {user: currentUser}=props;

        useEffect(() =>{

          EmployeeService.getAttendanceByEmployeeId(employeeId)
            .then((response) =>{
	        console.log("Data", response.data);	
	        setAttendance(response.data);
	    })
	    .catch((error) =>{
            console.log(error);
	    });

    },[]);

	if(!currentUser){
        	return <Redirect to="/login" />;
    }

   // Calculate total attendance days and present days
    const totalDays = attendance.length;
    const presentDays = attendance.filter((record) => record.present.toLowerCase() === "present").length;
    const attendancePercentage = (presentDays / totalDays) * 100 || 0;


    //colour
    const styles = {
        redText: {
          color: "red",
        },
      };


	return(

             <div>
            <h2>Your attendance</h2>
            <p style={attendancePercentage < 50 ? styles.redText : {}}>Attendance Percentage: {attendancePercentage.toFixed(2)}%</p>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Attendance Date</TableCell>
                            <TableCell>Present</TableCell>
                            <TableCell>Employee ID</TableCell>
                            <TableCell>Absence Reason</TableCell>
                            
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
                                
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>



	);
}
export default SingleEmpAttendance;