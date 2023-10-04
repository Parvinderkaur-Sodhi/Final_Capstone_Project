import React, { useEffect, useState } from 'react'
import hrService from '../../../services/hr.service'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, Pagination, Paper, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import { CancelOutlined, Done } from '@mui/icons-material';
import ApplicationInfo from './ApplicationInfo';
import { toast } from 'react-toastify';
const Status = (props) => {
    const [applicationJob,setApplicationJob]=useState([]);
    const [d,setD]=useState();
      const JobStatus=["Inprocess","Interview","Accepted","Rejected"];
const [open,setOpen]=useState(false);
const [selectedRequestId,setSelectedRequestId]=useState();
const [selectedStatus,setSelectedStatus]=useState();

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
return "#008000";
if(status=="Rejected")
return "#D04b4b";
if(status=="Interview")
return "#F2CC87";
}

const changeStatus=(id,status)=>{  
    setSelectedRequestId(id);
     setSelectedStatus(status);
 setDialogOpen(true);
}
const handleDeleteConfirm = () => {
    const obj={
    "status":selectedStatus
  };
    hrService.updateStatus(selectedRequestId,obj).then((response)=>{
        console.log(response.data);
        toast.success("Status updated successfully !");
        viewByprofileandStatus();
            setDialogOpen(false);

    })
  };

  const handleDeleteCancel = () => {
    setSelectedRequestId();
    setSelectedStatus();
    setDialogOpen(false);
  };

 const openDrawer=(index)=>{
setOpen(true);
setD(index);
    }
 const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4;
const [dialogOpen,setDialogOpen]=useState(false);
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentappliedJob = applicationJob.slice(indexOfFirstJob, indexOfLastJob);
  const totalPageCount = Math.ceil(applicationJob.length / jobsPerPage);
   const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Dialog open={dialogOpen}>
          <DialogTitle>Update Application Status</DialogTitle>
          <DialogContent>
            Are you sure you want to update to {selectedStatus} stage?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="error">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
   {applicationJob.length>0 &&   
   <>
    <TableContainer component={Paper} style={{ width: "900px" ,marginLeft:"-80px"}}>
      <Table>
        <TableHead style={{width:"1000px"}}>

          <TableRow sx={{backgroundColor:"lightgrey",width:"500px"}}>
            <TableCell width={120}>Application Id</TableCell>
            <TableCell width={160}>Employee Name</TableCell>
            <TableCell width={250}>Current Profile</TableCell>
            <TableCell width={150}>Status</TableCell>
         {props.status!=="Rejected" &&  props.status!=="Accepted" && <TableCell width={500}>Action</TableCell>}
<TableCell>More</TableCell>
        </TableRow>
        </TableHead>

        <TableBody>
        {
       applicationJob && currentappliedJob.map((j)=>
     
       (
        <>
            <TableRow
              key={j.applicationId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,height:20}}
            >
              <TableCell component="th" scope="row">{j.applicationId}</TableCell>
              <TableCell>{j.emp["fname"]}</TableCell>
              <TableCell >{j.emp["jobTitle"]}</TableCell>
              <TableCell >
                <Typography width={80} height={40}  padding={1} style={{color:`${checkColor(j.status)}`}}>
                {j.status}</Typography></TableCell>
            
 {props.status !=="Rejected" && props.status!=="Accepted" &&
<TableCell>
<Button variant="outlined" startIcon={<CancelOutlined style={{color:"red"}}/>} onClick={()=>{changeStatus(j.applicationId,"Rejected")}}>
Reject</Button>
 
   
    <Button variant="outlined" sx={{ marginLeft:"2px"}} startIcon={<Done style={{color:"green"}}/>} onClick={()=>{changeStatus(j.applicationId,JobStatus[JobStatus.indexOf(j.status)+1])}}>
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
 <Box style={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}>
          <Pagination count={totalPageCount} page={currentPage} onChange={handlePageChange}  boundaryCount={1} siblingCount={0} />
        </Box>  
        </> 
}

{
  applicationJob.length==0 && 
  <Typography>No Application availabel</Typography>
}
    </>
  )
}

export default Status