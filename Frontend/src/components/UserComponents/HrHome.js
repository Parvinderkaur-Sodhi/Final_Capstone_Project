import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Card, CardContent, Typography} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HrService from "../../services/hr.service";
import SmallCalendar from "../DashBoardComponents/SmallCalendar";
import { blue, green, red } from "@mui/material/colors";
import EventIcon from "@mui/icons-material/Event";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import HrNavbar from "../DashBoardComponents/HrNavbar";
import { PieChart } from '@mui/x-charts/PieChart';


function HrHome(props) {
  const { user: currentUser } = props;
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(85); // Sample data
  const [notificationOpen, setNotificationOpen] = useState(false);
const status=["Inprocess","Interview","Accepted","Rejected"];
const category=["Design","Development","testing","sales","Marketing","Banking"];
const [len,setLen]=useState([]);
const [total,setTotal]=useState([]);
  useEffect(() => {
    HrService.getAllLeaveRequests()
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(()=>{
    status.forEach((i)=>{
    HrService.searchByStatus(i).then((response)=>{
      setLen((prev)=>[...prev,response.data.length]);
    })

    })
      category.forEach((i)=>{
    HrService.getJobBycategory(i).then((response)=>{
      setTotal((prev)=>[...prev,response.data.length]);
    })

    })
  },[])
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
      <Card style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px", padding: "10px" }}>
      <Grid container spacing={3}>
        {/* Saved Job Listings */}
        <Grid item xs={4}>
          <h2>Job Summary</h2>
          <Card sx={{ backgroundColor: 'white', marginBottom: 4 }}>
            <CardContent>
              <PieChart
    series={[
  {
    data:[
      {id:0,value:total[0],label:'design',color:'lightgrey'},
      {id:1,value:total[1],label:'Development',color:'lightblue'},
      {id:2,value:total[2],label:'Testing',color:'lightgreen'},
      {id:4,value:total[3],label:'Sales',color:'#ff6347'},
      {id:5,value:total[4],label:'Marketing',color:'violet'},
      {id:6,value:total[5],label:'Banking',color:'lightyellow'},

    ]
  }
    
     ]}
      width={300}
      height={200}
    />
            </CardContent>
          </Card>

        </Grid>

        {/* Job Offers */}
        <Grid item xs={4}>
          <h2>Application Summary</h2>
          <Card sx={{ backgroundColor: "white",padding:"0px" }}>
            <CardContent>


    <PieChart
    series={[
 
  {
    data:[
      {id:0,value:len[0],label:'New',color:'lightgrey'},
      {id:1,value:len[1],label:'Interview',color:'lightblue'},
      {id:2,value:len[2],label:'Hired',color:'lightgreen'},
      {id:4,value:len[3],label:'Rejected',color:'#fa5f55'},

    ]
  }
    
     ]}
      width={300}
      height={200}
    />
 
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <h2>Attendance</h2>
          {/* <Card sx={{ backgroundColor: blue[100], marginBottom: 4 }}>
            <CardContent>
              <Box display="flex" justifyContent="center" alignItems="center">
                <CircularProgress
                  variant="determinate"
                  value={attendancePercentage}
                  size={100}
                  thickness={6}
                />
                &nbsp;&nbsp;
                <Typography variant="h6" gutterBottom>
                  {attendancePercentage}%
                </Typography>
              </Box>
            </CardContent>
          </Card> */}
        </Grid>
        {/* Attendance Percentage */}

        <Grid item xs={6}>
          <h2>Leaves</h2>
          <Card sx={{ backgroundColor: blue[100], marginBottom: 4, display: 'flex', justifyContent: 'center' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calendar
              </Typography>
              <SmallCalendar leaveRequests={leaveRequests} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6}>
          <h2>News and Events</h2>
          <Card sx={{ backgroundColor: red[100], marginBottom: 4 }}>
            <CardContent>
              <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
                <EventIcon style={{ marginRight: "8px" }} />
                {/* Attendance Percentage: {attendancePercentage.toFixed(2)}% */}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {/* Present Days: {attendanceData.presentDays} */}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {/* Total Working Days: {attendanceData.totalWorkingDays} */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Card>
    </div>
  );
}

export default HrHome;
