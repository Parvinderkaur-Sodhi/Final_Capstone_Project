
import React from 'react'
import HrService from '../../../services/hr.service';

import {Stack,Typography,Button,Card,Paper,InputBase,Divider,IconButton, Drawer,Grid, Box, Dialog, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
// import SearchJob from './SearchJob';
import { ChairOutlined, ChangeCircle, CurrencyRupeeSharp } from '@mui/icons-material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { useState } from 'react';
import employeeService from '../../../services/employee.service';
import hrService from '../../../services/hr.service';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ViewJob = (props) => {
    const categoryList=["design","development","testing","sales"];
    const seniorityList=["Senior","Junior","Middle"];
    const jobType=["Full time","Part Time","Remote","Internship"];
    const experience=[1,2,3,"4 and above"];
    // const salary=[]
   
    const [category,setCategory]=useState();
    const history=useHistory();
    useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));
const token=user["accessToken"];
        getAllCustomerDetails(token);
    }, []);
//    const openDrawer=(index)=>{
// setOpen(true);
// setD(index);
//     }
    const getAllCustomerDetails = (token) => {
        employeeService.getAllJobs(token).then((response) => {
            props.setJob(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }


   

    const ViewAppliedJobs=(jobProfile)=>{
      console.log(jobProfile);
history.push(`/AppliedJobs/${jobProfile}`);
    }
  return (
      <>
     
    <h4 style={{margin:"50px 34px"}}>Recommended Jobs </h4>
    <Grid container sx={{mt:-4,ml:1}}>

{
props.job &&  props.job.map((j,index)=>
    {
    
      const date=new Date(j.publish_date);
      const currdate=new Date();
      var diff=currdate.getDate()-date.getDate();
// var days=diff/(1000*60*60*24);
      return (
    <>
    
          <Card style={{width:320,height:100,margin:"5px 10px 10px",borderRadius:10,backgroundColor:"white"}}>
              <Stack direction="row">
               <Typography style={{fontSize:12,margin:"10px 20px"}}>{j.category}</Typography>
              <Typography  style={{bgcolor:"white",margin:"10px 70px",color:"black",fontSize:12}} >{diff} days ago</Typography>
   </Stack>
    <Typography style={{fontSize:20,fontWeight:'bolder',color:"#88304E",margin:"-15px 20px"}}>{j.jobProfile}</Typography> 
   
<Stack direction="row">
  <Stack>
       <Typography style={{fontSize:12,margin:"30px 20px",fontWeight:"bolder"}}>1 Opening</Typography>   
</Stack>
<Button variant="outlined"  onClick={()=>{ViewAppliedJobs(j.jobProfile)}} style={{width:70,height:30,backgroundColor:"#88304E",color:"white",margin:"25px 70px"}}>
  <Typography style={{fontSize:10}} >Details</Typography></Button>  
  

  </Stack>
 

  
</Card>


  </>
      )
    }
   ) 
   }
   </Grid>
</>
  )
}

export default ViewJob