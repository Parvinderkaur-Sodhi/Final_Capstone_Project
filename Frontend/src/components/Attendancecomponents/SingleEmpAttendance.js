import React, {useState, useEffect} from "react";
import { Redirect,  useParams, Link } from "react-router-dom";
import EmployeeService from "../../services/employee.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";

function formatDate(dateString) {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const useStyles = makeStyles({

  root: {
      "& .MuiTableCell-head": {
          color: "black",
          backgroundColor: "lightgrey",
          fontWeight: "bold"
      },
  },
  pageBackground: {
    backgroundColor: "#98144d",
    color: "white",
     
  },

});


function SingleEmpAttendance(props){
	//const {employeeId}=useParams();
	const [attendance, setAttendance]=useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const employeeId = localStorage.getItem("employeeId");
  const classes = useStyles();

  const {user: currentUser}=props;

  useEffect(() => {
    EmployeeService.getAttendanceByEmployeeId(employeeId)
      .then((response) => {
        setAttendance(response.data);

        const presentDays = response.data.filter(
          (record) => record.present.toLowerCase() === "present"
        ).length;
        console.log("Present Days:", presentDays); // Add this line
        const percentage = (presentDays / response.data.length) * 100 || 0;
        console.log("Percentage:", percentage); // Add this line
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

  const styles = {
    redText: {
      color: "red",
    },
  };

  return (
    <div className={classes.pageBackground}>
      {/* <EmployeeNavbar /> */}
       
      <h2 >Your attendance details:

         
    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10px' }}>
      <Link to="/mark-attendance">
        <Button variant="contained" color="success">
          Mark Attendance
        </Button>
      </Link>
    </div>
      
      </h2>
      <p >  Employee ID: {employeeId}</p>
      <p className={classes.introText}>We value your commitment and punctuality. Your consistent attendance and dedication to your role contribute significantly to our team's success. By being present and engaged, you help maintain a productive work environment and contribute to the achievement of our goals. Thank you for your ongoing efforts, and we look forward to your continued active participation and contributions.</p>
      <p style={attendancePercentage < 50 ? styles.redText : {}}>
        Attendance Percentage: {attendancePercentage.toFixed(2)}%
      </p>
      <p>
        Attendance Status: {attendanceStatus}
      </p>
      
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
          

            <TableRow className={classes.root}>
              {/* <TableCell>ID</TableCell> */}
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              {/* <TableCell>Employee ID</TableCell>  */}
              <TableCell>Absence Reason</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendance.map((attendanceRecord) => (
              <TableRow key={attendanceRecord.attendanceId}>
                {/* <TableCell>{attendanceRecord.attendanceId}</TableCell> */}
                <TableCell>
                  {formatDate(attendanceRecord.attendanceDate)}
                </TableCell>
                <TableCell>{attendanceRecord.present}</TableCell>
                {/* <TableCell>
                  {attendanceRecord.employee.employeeId}
                </TableCell> */}
                <TableCell>{attendanceRecord.absenceReason}</TableCell>
                <TableCell>
                  {attendanceRecord.approvalStatus === "REJECTED" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        const updatedReason = prompt(
                          "Enter new absence reason:"
                        );
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
    </div>
  );
}

export default SingleEmpAttendance;
