import React, {useState, useEffect} from "react";
import { Redirect, Link } from "react-router-dom";
import HrService from "../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import HrNavbar from "../DashBoardComponents/HrNavbar";
//import { TablePagination } from "@mui/material";


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
    // const [page, setPage] = useState(0);
    // const [rowsPerPage, setRowsPerPage] = useState(6);

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10));
    //     setPage(0);
    // };

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

  // style={{ maxHeight: "84vh", overflowY: "auto", paddingRight: "17px" }}
    return(
        <div className={classes.pageBackground} >
            <HrNavbar />
            
            <h2 style={{ padding: "10px", color: "black", textAlign: "center" }}>Attendance List</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow className={classes.root}>
                            <TableCell>ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Employee ID</TableCell>
                            {/* <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell> */}
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
                                    {/* <TableCell>{attendance.employee.fname}</TableCell>
                                    <TableCell>{attendance.employee.lname}</TableCell> */}
                                    <TableCell>{attendance.employee.username}</TableCell>
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
            {/* <TablePagination
                rowsPerPageOptions={[6, 12, 24]}
                component="div"
                count={attendance.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
           
        </div>
    );
}
export default AttendanceList;


