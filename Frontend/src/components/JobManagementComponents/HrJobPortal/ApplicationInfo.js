import { Box, Button, Card, Divider, Drawer, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, makeStyles } from '@mui/material'
import React, { useEffect, useState } from 'react'
import hrService from '../../../services/hr.service'

const ApplicationInfo = (props) => {
    console.log(props.d);
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
   <Box boxShadow={1} borderWidth='1px'  width="400px"  height="80px" backgroundColor="#c2c6be">
      <Typography style={{fontSize:20,fontWeight:'bolder',color:"black",margin:"0px 30px",textAlign:'center'}}>Avantika nagarle</Typography>  
      <Stack direction='row'>
               <Typography style={{fontSize:15,margin:"10px 30px 0px "}}>Design Team</Typography>  
               <Divider></Divider> 
               <Typography style={{fontSize:15,margin:"10px 35px 0px 4px"}}>UI Designer</Typography>   
</Stack> 
      </Box>
      <TableContainer component={Card} style={{width:400,height:250,fontSize:1}}>
    <Table aria-label="simple table">
        <TableHead>
            <TableRow>
<TableCell>Basic Info</TableCell>
            </TableRow>
        </TableHead>
        
        <TableBody> 

            <Stack style={{padding:20,mt:-10}}>
        <Stack direction="row">
            <Stack>
            <Typography>Name</Typography>
            <Typography>{emp['fname']} {emp['lname']} </Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Email</Typography>
            <Typography>{emp.email}</Typography>
</Stack>
  <Stack ml={8}>
            <Typography>Phone No</Typography>
            <Typography>{emp.phoneNumber}</Typography>
</Stack>
        </Stack>
           <Stack direction="row" mt={4}>
            <Stack>
            <Typography>DOB</Typography>
            <Typography>{emp.dob}</Typography>
</Stack>
  <Stack direction="row" ml={8}>
            <Typography>address</Typography>
            <Typography>{emp.address}</Typography>
</Stack>
        </Stack>
          
           
        </Stack>
        </TableBody>
    </Table>
    </TableContainer>
    <TableContainer component={Card} style={{width:400,height:200,marginTop:30}}>
    <Table   aria-label="simple table">
        <TableHead>
            <TableRow>
<TableCell>Professionals Details</TableCell>
            </TableRow>
        </TableHead>
        
        <TableBody> 

            <Stack style={{padding:20}}>
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
        
        </Stack></TableBody>
    </Table>
    </TableContainer>
    <Button variant="outlined"  onClick={()=>{
              props.setOpen(false);
              props.setD()}} 
              style={{width:110,height:40,color:'#88304e',margin:"10px 10px"}}>
      <Typography style={{fontSize:15,fontWeight:'bolder'}}>Close</Typography></Button>  

    </>
}
</>
  )
}

export default ApplicationInfo