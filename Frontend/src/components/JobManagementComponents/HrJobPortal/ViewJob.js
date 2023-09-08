
import React from 'react'

import {Stack,Typography,Button,Card,Grid, CircularProgress} from '@mui/material';

import { useEffect } from 'react';
import { useState } from 'react';
import employeeService from '../../../services/employee.service';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ViewJob = (props) => {
   
   const[loading,setLoading]=useState(true);
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
          setLoading(false);
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
    <Grid container>
{loading && <CircularProgress/>}
{
props.job &&  props.job.map((j,index)=>
    {
    
      const date=new Date(j.publish_date);
      const currdate=new Date();
      var diffinmilli=Math.abs(date.getTime()-currdate.getTime());
var diff=Math.ceil(diffinmilli/(1000*3600*24));
      return (
    <>
    
          <Card style={{width:300,height:100,margin:"5px 20px 10px",borderRadius:10,backgroundColor:"white"}}>
              <Stack direction="row">
               <Typography style={{fontSize:12,margin:"10px 20px"}}>{j.category}</Typography>
            {diff>0 &&  <Typography  style={{bgcolor:"white",marginTop:"10px",marginLeft:"70px",color:"black",fontSize:12}} >{diff} days ago</Typography>}
                        {diff==0 &&  <Typography  style={{bgcolor:"white",marginTop:"10px",marginLeft:"70px",color:"black",fontSize:12}} >Today</Typography>}

   </Stack>
    <Typography style={{fontSize:20,fontWeight:'bolder',color:"#88304E",margin:"-15px 20px"}}>{j.jobProfile}</Typography> 
   
<Stack direction="row">
  <Stack>
       <Typography style={{fontSize:12,margin:"30px 20px",fontWeight:"bolder"}}>{j.vacancy} opening</Typography>   
</Stack>
<Button variant="outlined"  onClick={()=>{ViewAppliedJobs(j.jobProfile)}} style={{width:70,height:30,backgroundColor:"#88304E",color:"white",margin:"25px 40px"}}>
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