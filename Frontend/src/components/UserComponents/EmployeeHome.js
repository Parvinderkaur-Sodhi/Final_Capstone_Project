import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { blue, green, red } from "@mui/material/colors";
import EventIcon from "@mui/icons-material/Event"; 
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";
import { PieChart } from '@mui/x-charts/PieChart';


function EmployeeHome(props) {
  const { user: currentUser } = props;
  const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    const storedEmployeeId = localStorage.getItem('employeeId');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }
  }, []);


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
      <EmployeeNavbar/>
      <Grid container spacing={3}>

        {/* Greeting */}
        <Grid item xs={10}>
          <Card sx={{ backgroundColor: red[100], marginBottom: 4 }}>
            <CardContent>
              <Typography variant="h6" color="textPrimary">
                Hello!!!!! (Greetings)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Saved Job Listings */}
       
        

        {/* Job Offers */}
        <Grid item xs={3} mt={-5}>
          <h2>Job Offers</h2>
          <Card sx={{ backgroundColor:blue[100],width:320,height:200}}>
            <CardContent>
                           <PieChart
    series={[
  {
    data:[
      {id:0,value:10,label:'Design',color:'lightgrey'},
      {id:1,value:25,label:'Development',color:'lightblue'},
      {id:2,value:25,label:'Testing',color:'lightgreen'},
      {id:4,value:25,label:'Sales',color:'#ff6347'},
      {id:5,value:50,label:'Marketing',color:'violet'},
      {id:6,value:25,label:'Banking',color:'lightyellow'},

    ]
  }
    
     ]}
      width={250}
      height={170}
    />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3} mt={-5} ml={10}>
                  <h2>Job Applied</h2>

               <Card sx={{ backgroundColor: red[100]}}>
            <CardContent>


    <PieChart
    series={[
 
  {
    data:[
      {id:0,value:10,label:'New',color:'lightgrey'},
      {id:1,value:25,label:'Interview',color:'lightblue'},
      {id:2,value:25,label:'Hired',color:'lightgreen'},
      {id:4,value:25,label:'Rejected',color:'#fa5f55'},

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
         
        <Grid item xs={5} mt={-5}>
          <h2>Attendance</h2>
          <Card sx={{ backgroundColor: blue[100], marginBottom: 4 }}>
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

        <Grid item xs={5}>
          <h2>Leaves</h2>
          <Card sx={{ backgroundColor: red[100], marginBottom: 4 }}>
            <CardContent>
              <Typography variant="h6" style={{ display: "flex", alignItems: "center" }}>
                <LocalFloristIcon style={{ marginRight: "8px" }} />
                {/* Leave Balance: {leaveData.totalLeaves - leaveData.usedLeaves} */}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {/* Total Leaves: {leaveData.totalLeaves} */}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {/* Used Leaves: {leaveData.usedLeaves} */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default EmployeeHome;
