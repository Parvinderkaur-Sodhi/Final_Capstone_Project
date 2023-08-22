import { Box, Card, Divider, Drawer, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, makeStyles } from '@mui/material'
import React from 'react'

const ApplicationInfo = () => {
  return (
    <>
    <Box boxShadow={1} borderWidth='1px'  width="600px"  height="80px" backgroundColor="#c2c6be">
      <Typography style={{fontSize:20,fontWeight:'bolder',color:"black",margin:"0px 30px",textAlign:'center'}}>Avantika nagarle</Typography>  
      <Stack direction='row'>
               <Typography style={{fontSize:15,margin:"10px 30px 0px "}}>Design Team</Typography>  
               <Divider></Divider> 
               <Typography style={{fontSize:15,margin:"10px 35px 0px 4px"}}>UI Designer</Typography>   
</Stack> 
      </Box>
      <TableContainer component={Card} style={{width:600,height:1000,fontSize:1}}>
    <Table  style={{ width: 600,boxShadow:10,height:400,fontSize:1}} aria-label="simple table">
        <TableHead>
            <TableRow>
<TableCell>Basic Info</TableCell>
            </TableRow>
        </TableHead>
        
        <TableBody> 

            <Stack style={{padding:30}}>
        <Stack direction="row">
            <Stack>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
        </Stack>
           <Stack direction="row" mt={4}>
            <Stack>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
        </Stack>
           <Stack direction="row" mt={4}>
            <Stack>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
        </Stack>
           <Stack direction="row" mt={4}>
            <Stack>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
        </Stack>
        </Stack></TableBody>
    </Table>
    </TableContainer>
    <TableContainer component={Card} style={{width:600,marginTop:30}}>
    <Table  style={{ width: 600,boxShadow:10}} aria-label="simple table">
        <TableHead>
            <TableRow>
<TableCell>Professionals Details</TableCell>
            </TableRow>
        </TableHead>
        
        <TableBody> 

            <Stack style={{padding:30}}>
        <Stack direction="row">
            <Stack>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
        </Stack>
           <Stack direction="row" mt={4}>
            <Stack>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
        </Stack>
           <Stack direction="row" mt={4}>
            <Stack>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
        </Stack>
           <Stack direction="row" mt={4}>
            <Stack>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
   <Stack ml={8}>
            <Typography>Current Job Role</Typography>
            <Typography>Ui/Ux Designer</Typography>
</Stack>
        </Stack>
        </Stack></TableBody>
    </Table>
    </TableContainer>
    </>
  )
}

export default ApplicationInfo