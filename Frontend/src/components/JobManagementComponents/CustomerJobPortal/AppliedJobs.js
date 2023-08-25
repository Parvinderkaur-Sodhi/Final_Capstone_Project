import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import employeeService from '../../../services/employee.service';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Box, Button, Divider, Drawer, FormControl, InputLabel, Select, Stack, Typography } from '@mui/material';
import JobInfofCus from './JobInfofCus';
import { MenuItem } from '@material-ui/core';
import hrService from '../../../services/hr.service';
const AppliedJobs = () => {
   const [d,setD]=useState();
      const JobStatus=["Inprocess","Interview","Accepted","Rejected"];
const [open,setOpen]=useState(false);
  
const [appliedJob,setAppliedJob]=useState([]);
const {empid}=useParams();
console.log(empid);
useEffect(()=>{
getAppliedJobs();
},[])


const getAppliedJobs=()=>{
  employeeService.getAppliedJobforEmp(empid).then((response) => {
            setAppliedJob(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
}
const handleChangeStatus=(e)=>{
  if(e.target.value=="None"){
    getAppliedJobs();
  }
  else{
  hrService.searchByStatus(e.target.value).then((response)=>{
    setAppliedJob(response.data);
  })
  }
}
  const checkColor=(status)=>{
    if(status=="Inprocess")
    return "#76b5c5";
if(status=="Accepted")
return "#92e3b4";
if(status=="Rejected")
return "#D04b4b";
if(status=="Interview")
return "#fff59e";
}
const openDrawer=(index)=>{
setOpen(true);
setD(index);
    }

  return (
    <>
    <Stack direction="row" margin={4}>
      <Typography sx={{fontSize:30,color:"#98144b"}}>Applied Jobs :</Typography>
      <FormControl style={{borderColor:"#98144d",marginLeft:13}}>
  <InputLabel style={{marginLeft:370,marginTop:-5}}>Status</InputLabel>
  <Select
   
    // value={category}
    label="Category"
    onChange={(e)=>handleChangeStatus(e)}
    sx={{borderColor:"#98144dd",marginLeft:120,width:120}}
  >
    <MenuItem value="None">None</MenuItem>
    {JobStatus.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </Select>
</FormControl>
</Stack>
    {appliedJob.length>0 &&    <TableContainer component={Card}>
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
            <TableCell >Current Profile</TableCell>
            <TableCell >Status</TableCell>
         {/* {props.status!=="Rejected" &&  props.status!=="Accepted" && <TableCell>Action</TableCell>} */}
<TableCell>More</TableCell>
        </TableRow>
        </TableHead>

        <TableBody>
        {
       appliedJob && appliedJob.map((j)=>
       (
        <>
            <TableRow
              key={j.applicationId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,height:20}}
            >
              <TableCell component="th" scope="row">{j.applicationId}</TableCell>
              <TableCell>{j.emp["fname"]+" " +j.emp["lname"]}</TableCell>
              <TableCell >{j.job["jobProfile"]}</TableCell>
              <TableCell >
                <Box width={80} height={40} boxShadow={4}  borderRadius={6} padding={1} style={{backgroundColor:`${checkColor(j.status)}`}}>
                {j.status}</Box></TableCell>
            
 {/* {props.status !=="Rejected" && props.status!=="Accepted" &&
<TableCell>
<Button variant="outlined" startIcon={<CancelOutlined/>} onClick={()=>{changeStatus(j.applicationId,"Rejected")}}>
Reject</Button>
 
   
    <Button variant="outlined" startIcon={<Done/>} onClick={()=>{changeStatus(j.applicationId,JobStatus[JobStatus.indexOf(j.status)+1])}}>
Next Stage</Button>
</TableCell>
} */}
         <TableCell><Button onClick={()=>openDrawer(j.job.jobId)}>Info</Button></TableCell> 
{d!=null && <Drawer
 variant="persistent"
      anchor='right'
      open={open}
      onClose={()=>setOpen(false)}
      PaperProps={{sx:{width:400,height:680}}}
    >

 <JobInfofCus index={d} setOpen={setOpen} setD={setD}/>
    </Drawer>
}
            </TableRow>
            </>
       )

       )
      }
        </TableBody>
      </Table>
    </TableContainer>
}
</>
// {
//   applicatiJob.length==0 && 
//   <Typography>No Application availabel</Typography>
// }
  )
}

export default AppliedJobs