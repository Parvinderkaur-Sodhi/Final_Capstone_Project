import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import HrService from "../../services/hr.service";
import SmallCalendar from "../DashBoardComponents/SmallCalendar";
import HrNavbar from "../DashBoardComponents/HrNavbar";
import { PieChart } from '@mui/x-charts/PieChart';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { format } from 'date-fns';

function HrHome(props) {
  const { user: currentUser } = props;
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0); // Initialize with 0

  const [notificationOpen, setNotificationOpen] = useState(false);
  const status = ["Inprocess", "Interview", "Accepted", "Rejected"];
  const category = ["Design", "Development", "testing", "sales", "Marketing", "Banking"];
  const [len, setLen] = useState([]);
  const [total, setTotal] = useState([]);

  
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  // Function to open the event dialog
  const openEventDialog = () => {
    setEventDialogOpen(true);
  };

  // Function to close the event dialog
  const closeEventDialog = () => {
    setEventDialogOpen(false);
  };


  useEffect(() => {
    HrService.getAllLeaveRequests()
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // attendance
  useEffect(() => {
    const currentDate = new Date().toLocaleDateString('en-US'); 

    HrService.getAllAttendances()
      .then((response) => {
        const allAttendances = response.data;

        // Filter attendance records for the current date
        const specificDateAttendances = allAttendances.filter(
          (attendance) => {
            const formattedAttendanceDate = format(new Date(attendance.attendanceDate), 'M/d/yyyy');
            return formattedAttendanceDate === currentDate;
          }
        );

        const totalEmployees = specificDateAttendances.length;
        const presentEmployees = specificDateAttendances.filter(
          (attendance) => attendance.present === 'present'
        ).length;

        if (totalEmployees === 0) {
          setAttendancePercentage(0);
        } else {
          const calculatedAttendancePercentage = (presentEmployees / totalEmployees) * 100;
          setAttendancePercentage(calculatedAttendancePercentage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

 

  useEffect(() => {
    status.forEach((i) => {
      HrService.searchByStatus(i).then((response) => {
        setLen((prev) => [...prev, response.data.length]);
      })

    })
    category.forEach((i) => {
      HrService.getJobBycategory(i).then((response) => {
        setTotal((prev) => [...prev, response.data.length]);
      })

    })
  }, [])
  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleNotificationOpen = () => {
    setNotificationOpen(true);
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <HrNavbar />
      
      <Card style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px", padding: "10px", backgroundColor: "white" }}>
        <Grid container spacing={2}>
          {/* Saved Job Listings */}
          <Grid item xs={4}>
            <Card sx={{ backgroundColor: "lightgrey" }}>
              <CardContent>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: total[0], label: 'design', color: '#98144d' },
                        { id: 1, value: total[1], label: 'Development', color: '#a22b5e' },
                        { id: 2, value: total[2], label: 'Testing', color: '#c17294' },
                        { id: 4, value: total[3], label: 'Sales', color: '#d182a0' },
                        { id: 5, value: total[4], label: 'Marketing', color: '#ead0db' },
                        { id: 6, value: total[5], label: 'Banking', color: '#f4e7ed' },

                      ],
                       innerRadius: 70,
      outerRadius: 40,
      cx: 70,
      cy: 80,
                    }

                  ]}
                  width={250}
                  height={170}
                />
              </CardContent>
            </Card>

          </Grid>

          {/* Job Offers */}
          <Grid item xs={4}>
            <Card sx={{  backgroundColor: "lightgrey"  }} >
              <CardContent>
                <PieChart
                  series={[

                    {
                      data: [
                        { id: 0, value: len[0], label: 'New', color: 'white' },
                        { id: 1, value: len[1], label: 'Interview', color: 'lightblue' },
                        { id: 2, value: len[2], label: 'Hired', color: 'lightgreen' },
                        { id: 4, value: len[3], label: 'Rejected', color: '#fa5f55' },

                      ],
                       innerRadius: 70,
      outerRadius: 60,
      
      cx: 70,
      cy: 80,
                    }

                  ]}
                  width={250}
                  height={170}
                />
              </CardContent>
            </Card>
          </Grid>

        {/* Attendance */}
        <Grid item xs={4}>
          <Card sx={{  backgroundColor: "lightgrey"  }}>
            <CardContent>
            <Typography variant="h6" gutterBottom>
                <strong>Today's Attendance Summary:</strong>
            </Typography>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="body1">
              <strong>Present:</strong> {attendancePercentage.toFixed(2)}%
            </Typography>
            <Typography variant="body1">
              <strong>Absent:</strong>{" "}
                {(100 - attendancePercentage).toFixed(2)}%
            </Typography>
            </div>
            </CardContent>
          </Card>
        </Grid>




          <Grid item xs={6}>
            <Card sx={{  backgroundColor: "lightgrey" , display: 'flex', justifyContent: 'center' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <strong>Calendar</strong>
                </Typography>
                <SmallCalendar leaveRequests={leaveRequests} />
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

        
          <Card sx={{ backgroundColor: "lightgrey", display: "flex", alignItems: "center", marginLeft: "40px", marginTop: "15px", padding: "10px" }}>
              <CardContent>
                <h3>News and Events</h3>
                <p>Join our upcoming Tech Talk:</p>
                <strong>Event: </strong> Tech Talk: Future of AI<br />
                <strong>Date: </strong> October 15, 2023<br />
                <strong>Time: </strong> 3:00 PM - 5:00 PM<br />
                <strong>Location: </strong> Conference Room A<br />
                <Button onClick={openEventDialog} variant="contained" style={{backgroundColor: "#98144d"}}>
                  Register Now
                </Button>
              </CardContent>
          </Card>
          <Dialog open={eventDialogOpen} onClose={closeEventDialog}>
          <DialogTitle>Register for Tech Talk: Future of AI</DialogTitle>
          <DialogContent>
          <p>
              You missed this exciting Tech Talk on the Future of AI. Registration closed!! 
          </p>
          </DialogContent>
          <DialogActions>
          <Button onClick={closeEventDialog} color="primary">
              Close
          </Button>
    
          </DialogActions>
          </Dialog>

        




        </Grid>
      </Card>
    </div>
  );
}

export default HrHome;