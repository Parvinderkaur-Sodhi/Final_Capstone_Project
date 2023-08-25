import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
// import employeeService from '../../../services/employee.service';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import hrService from '../../../services/hr.service';
import { Box, Button, Stack, Typography } from '@mui/material';
import { CancelOutlined, Done } from '@mui/icons-material';
const AppliedJobs = () => {
 
const [appliedJob,setAppliedJob]=useState([]);
const {empid}=useParams();
useEffect(()=>{
TotalAppliedJobs();
},[])

const TotalAppliedJobs=()=>{
hrService.viewAppliedJobs().then((response) => {
            setAppliedJob(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
}
const checkColor=(status)=>{
    if(status=="Inprocess")
    return "#76b5c5";
if(status=="Accepted")
return "#92e3b4";
if(status=="Rejected")
return "#D04b4b";
if(status=="Interview")
return "purple";
}

const changeStatus=(id,status)=>{
  const obj={
    "status":status
  };
    hrService.updateStatus(id,obj).then((response)=>{
        console.log(response.data);
        TotalAppliedJobs();
    })
}
  return (
    <div>
    <TableContainer component={Card}>
      <Table width="400px" aria-label="simple table">
        <colgroup>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>

        </colgroup>
        <TableHead>
          <TableRow sx={{backgroundColor:"grey"}}>
            <TableCell >Application Id</TableCell>
            <TableCell>Employee Name</TableCell>
            <TableCell >Job Profile</TableCell>
            <TableCell >Status</TableCell>
            <TableCell >Salary</TableCell>
            <TableCell>Action</TableCell>
<TableCell>More..</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {appliedJob && appliedJob.map((j) => 
        (
            <TableRow
              key={j.applicationId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,height:20}}
            >
              <TableCell component="th" scope="row">
        {j.applicationId}
              </TableCell>
              <TableCell>{j.emp["fname"]+" " +j.emp["lname"]}</TableCell>
              <TableCell >{j.job["jobProfile"]}</TableCell>
              <TableCell ><Typography width={80} height={40} boxShadow={4} border="0px solid green" borderRadius={6} padding={1} style={{color:`${checkColor(j.status)}`}}>{j.status}</Typography></TableCell>
              <TableCell>{j.job["salary"]}</TableCell> 
            {/* <TableCell><Button onClick={()=>{changeStatus(j.applicationId,"Accepted")}}>Info</Button></TableCell>  */}
<TableCell>
  <Stack direction="row">
  <Button variant="outlined" startIcon={<CancelOutlined/>}>
Reject</Button>
 <Button variant="outlined" startIcon={<Done/>} style={{marginLeft:2}}>
Next Stage</Button>
"</Stack>

</TableCell>
            </TableRow>
          ))}  
        </TableBody>
      </Table>
    </TableContainer>
 

    </div>
  )
}

export default AppliedJobs