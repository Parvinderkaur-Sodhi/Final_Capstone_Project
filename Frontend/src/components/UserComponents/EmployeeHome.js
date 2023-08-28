import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";
import { PieChart } from '@mui/x-charts/PieChart';
import EmployeeService from "../../services/employee.service";
import { makeStyles } from "@mui/styles"; // Import makeStyles
import SmallCalendar from "../DashBoardComponents/SmallCalendar";
//import { EventIcon } from "@mui/icons-material";
import { Redo } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  attendanceCard: {
    //backgroundColor: red[100],
    backgroundColor: "lightgrey",
    padding: 16, // Use numeric value instead of theme.spacing
    borderRadius: 8, // Use numeric value instead of theme.spacing
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  attendanceStatus: {
    color: "#fff",
    backgroundColor: (props) =>
      props.attendanceStatus === "Poor" ? "red" : "green",
    padding: 8, // Use numeric value instead of theme.spacing
    borderRadius: 8, // Use numeric value instead of theme.spacing
    display: "inline-block",
  },
}));

function EmployeeHome(props) {
  const { user: currentUser } = props;

  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [attendanceStatus, setAttendanceStatus] = useState(""); // Default status
  const employeeId = localStorage.getItem("employeeId");
  const classes = useStyles({ attendanceStatus });

  useEffect(() => {
    const employeeId = localStorage.getItem('employeeId');
    if (employeeId) {
      EmployeeService.getLeaveRequestByEmployeeId(employeeId)
        .then((response) => {
          setLeaveRequests(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    EmployeeService.getAttendanceByEmployeeId(employeeId)
      .then((response) => {
        const presentDays = response.data.filter(
          (record) => record.present.toLowerCase() === "present"
        ).length;
        const percentage = (presentDays / response.data.length) * 100 || 0;
        setAttendancePercentage(percentage);

        // Determine attendance status
        if (percentage < 50) {
          setAttendanceStatus("Poor");
        } else {
          setAttendanceStatus("Good");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  // useEffect(()=>{
  //       const storedEmployeeId = localStorage.getItem('employeeId');

  //   status.forEach((i)=>{
  //   HrService.searchByStatus(i).then((response)=>{
  //     setLen((prev)=>[...prev,response.data.length]);
  //   })

  //   })
  //     category.forEach((i)=>{
  //   HrService.getJobBycategory(i).then((response)=>{
  //     setTotal((prev)=>[...prev,response.data.length]);
  //   })

  //   })
  // },[])

  return (
    <div>
      <EmployeeNavbar />
      <Card style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px", padding: "20px" , backgroundColor: "white"}}>
        <Grid container spacing={2}>

          {/* Job Offers */}
          <Grid item xs={4}>
            <Card sx={{backgroundColor: "lightgrey", display: "flex", justifyContent: "center"}}>
              <CardContent>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 10, label: 'Design', color: 'lightgrey' },
                        { id: 1, value: 25, label: 'Development', color: 'lightblue' },
                        { id: 2, value: 25, label: 'Testing', color: 'lightgreen' },
                        { id: 4, value: 25, label: 'Sales', color: '#ff6347' },
                        { id: 5, value: 50, label: 'Marketing', color: 'violet' },
                        { id: 6, value: 25, label: 'Banking', color: 'lightyellow' },

                      ]
                    }

                  ]}
                  width={250}
                  height={170}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card sx={{ backgroundColor: "lightgrey" }}>
              <CardContent>
                <PieChart
                  series={[

                    {
                      data: [
                        { id: 0, value: 10, label: 'New', color: 'lightgrey' },
                        { id: 1, value: 25, label: 'Interview', color: 'lightblue' },
                        { id: 2, value: 25, label: 'Hired', color: 'lightgreen' },
                        { id: 4, value: 25, label: 'Rejected', color: '#fa5f55' },

                      ]
                    }

                  ]}
                  width={250}
                  height={170}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Attendance Percentage */}
          <Grid item xs={4}>
            <Card className={classes.attendanceCard}>
              <CardContent>
                <Typography variant="h5" style={{ marginBottom: "16px" }}>
                  <strong>Your Attendance Details</strong>
                </Typography>
                <Typography variant="h6" style={{ marginBottom: "8px" }}>
                  Attendance Percentage: {attendancePercentage.toFixed(2)}%
                </Typography>
                <Typography variant="subtitle1">
                  Attendance Status:{" "}
                  <span className={classes.attendanceStatus}>
                    {attendanceStatus}
                  </span>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Leaves */}
          <Grid item xs={6}>
            <Card sx={{ backgroundColor: "lightgrey", display: 'flex', justifyContent: 'center' }}>
              <CardContent>
                <Typography variant="body1" color="textSecondary">
                  Your Leaves
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  {/* Optional: Loading message */}
                  {isLoading ? "Loading..." : ""}
                </Typography>
                {/* Render SmallCalendar only if leaveRequests is an array */}
                {Array.isArray(leaveRequests) && (
                  <SmallCalendar leaveRequests={leaveRequests} />
                )}
              </CardContent>
              <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px' }}>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'blue', width: '12px', height: '12px', marginRight: '4px' }}></div>
                    <span>Pending</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'green', width: '12px', height: '12px', marginRight: '4px' }}></div>
                    <span>Accepted</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ backgroundColor: 'red', width: '12px', height: '12px', marginRight: '4px' }}></div>
                    <span>Rejected</span>
                  </li>
                </ul>
              </div>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card sx={{backgroundColor: "lightgrey" }}>
              <CardContent>
                <Typography variant="body1" color="textSecondary">
                  News and Events
                </Typography>
              </CardContent>
            </Card>
          </Grid>


        </Grid>
      </Card>
    </div >
  );
}

export default EmployeeHome;