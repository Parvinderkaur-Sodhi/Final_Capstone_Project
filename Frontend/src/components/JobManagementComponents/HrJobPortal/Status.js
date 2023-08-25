import React, { useEffect, useState } from 'react'
import hrService from '../../../services/hr.service'
import { Box, Button, Divider, Drawer, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import { CancelOutlined, Done } from '@mui/icons-material';
import ApplicationInfo from './ApplicationInfo';
const Status = (props) => {
    const [applicationJob,setApplicationJob]=useState([]);
    const [d,setD]=useState();
      const JobStatus=["Inprocess","Interview","Accepted","Rejected"];
const [open,setOpen]=useState(false);
    useEffect(()=>{
      console.log(props.status);
viewByprofileandStatus();
    },[])


const viewByprofileandStatus=()=>{
    hrService.searchByProfilenStatus(props.jobProfile,props.status).then((response) => {
            setApplicationJob(response.data)
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
if(status=="Scheduled Interview")
return "purple";
}

const changeStatus=(id,status)=>{
    
  const obj={
    "status":status
  };
    hrService.updateStatus(id,obj).then((response)=>{
        console.log(response.data);
        viewByprofileandStatus();
    })
}

 const openDrawer=(index)=>{
setOpen(true);
setD(index);
    }

  return (
    <>
    
   {applicationJob.length>0 &&    <TableContainer component={Card}>
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
         {props.status!=="Rejected" &&  props.status!=="Accepted" && <TableCell>Action</TableCell>}
<TableCell>More</TableCell>
        </TableRow>
        </TableHead>

        <TableBody>
        {
       applicationJob && applicationJob.map((j)=>
     
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
            
 {props.status !=="Rejected" && props.status!=="Accepted" &&
<TableCell>
<Button variant="outlined" startIcon={<CancelOutlined/>} onClick={()=>{changeStatus(j.applicationId,"Rejected")}}>
Reject</Button>
 
   
    <Button variant="outlined" startIcon={<Done/>} onClick={()=>{changeStatus(j.applicationId,JobStatus[JobStatus.indexOf(j.status)+1])}}>
Next Stage</Button>
</TableCell>
}
         <TableCell><Button onClick={()=>openDrawer(j.emp.employeeId)}>Info</Button></TableCell> 
{d!=null && <Drawer
 variant="persistent"
      anchor='right'
      open={open}
      onClose={()=>setOpen(false)}
      PaperProps={{sx:{width:350,marginTop:9}}}
    >

        <ApplicationInfo index={d} setOpen={setOpen} setD={setD}/>
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
{
  applicationJob.length==0 && 
  <Typography>No Application availabel</Typography>
}
    </>
  )
}

export default Status