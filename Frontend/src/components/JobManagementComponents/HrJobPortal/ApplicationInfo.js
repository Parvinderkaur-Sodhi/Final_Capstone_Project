import { Box, Button, Card, Divider, Drawer, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, makeStyles } from '@mui/material'
import React, { useEffect, useState } from 'react'
import hrService from '../../../services/hr.service'

const ApplicationInfo = (props) => {
const [emp,setEmp]=useState();
useEffect(()=>{
hrService.getEmployeeById(props.index).then((response)=>{
    console.log(response.data);
    setEmp(response.data);
})
},[])
  return (
<>
   {
    emp && 
   <>
   <Box boxShadow={1} borderWidth='1px'  width="350px"  backgroundColor="#98144d">
      <Typography style={{fontSize:25,fontWeight:'bolder',color:"white",margin:"0px 30px",textAlign:'center'}}>{emp['fname']} {emp['lname']} </Typography>  
      <TableContainer>
    <Table aria-label="simple table" style={{margin:"10px 15px",color:"#DBDBDB",padding:2}}>
        <TableHead>
            <TableRow>
<TableCell style={{color:"white"}}>Basic Info</TableCell>
            </TableRow>
        </TableHead>
        
        <TableBody> 

            <Stack style={{mt:-10}}>
        <Stack direction="row">
            <Stack>
            <Typography>Name</Typography>
            <Typography>{emp['fname']} {emp['lname']} </Typography>
</Stack>
   <Stack ml={5}>
            <Typography>Email</Typography>
            <Typography>{emp.email}</Typography>
</Stack>
  
        </Stack>
           <Stack direction="row" mt={4}>
            <Stack>
            <Typography>DOB</Typography>
            <Typography>{emp.dob}</Typography>
</Stack>
<Stack ml={5}>
            <Typography>Phone No</Typography>
            <Typography>{emp.phoneNumber}</Typography>
</Stack>
  
        </Stack>
          
           <Stack mt={4}>
            <Typography>Address</Typography>
            <Typography>{emp.address}</Typography>
</Stack>
    
<TableCell style={{color:"white",margin:"30px 0px"}}>Professionals Details : </TableCell>
           
        

        <Stack direction="row">
            <Stack>
            <Typography>Current Job Role</Typography>
            <Typography>{emp.jobTitle}</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Department</Typography>
            <Typography>{emp.department}</Typography>
</Stack>
        </Stack>
           <Stack direction="row" mt={4}>
            <Stack>
            <Typography>Date of Joining</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Skills set</Typography>
            <Typography>cpp</Typography>
</Stack>
        </Stack>
     
    <Button variant="contained"  onClick={()=>{
              props.setOpen(false);
              props.setD()}} 
              style={{width:110,height:40,color:'#98144d',backgroundColor:'white',margin:"30px 30px"}}>
      <Typography style={{fontSize:15,fontWeight:'bolder'}}>Close</Typography></Button>  
         </Stack>
        </TableBody>
    </Table>
    </TableContainer>
      </Box>

    </>
}
</>
  )
}

export default ApplicationInfo