import React, { useState } from 'react'
import {Stack,Typography,Button,Card,Paper,InputBase,Divider,IconButton, Drawer} from '@mui/material';
import { NextPlan } from '@mui/icons-material';

const ViewJob = () => {
     const [open,setOpen]=useState(false);
  return (
//     {
//   job && job.map(j=>
       <Card style={{width:400,height:350,margin:120,border:"1px solid",borderColor:"white",borderRadius:20}}>
         <Typography style={{fontSize:20,fontWeight:'bolder',margin:"20px 40px",color:"#989191"}}> Design</Typography>   
     <Stack>
<Stack direction="row">
    <Typography style={{fontSize:30,fontWeight:'bolder',color:"purple",margin:"-10px 40px"}}>Ui Designer</Typography>   
</Stack>

         <Typography style={{fontSize:20,fontWeight:'lighter',margin:"20px 40px",color:"#989191"}}>Application</Typography>   
<Card style={{width:150,height:100,margin:"0px 40px",backgroundColor:"#EFECEC",padding:10}}>
    <Typography color={"#989191"}>Total</Typography>
        <Typography color={'Black'} fontSize={50}>57</Typography>

</Card>
<hr></hr>
<Stack direction="row">
    <Typography style={{fontSize:20,fontWeight:'lighter',margin:10}}>21 Aug 2001</Typography>   
{/* <Button variant="contained"  onClick={()=>{setOpen(true)}} style={{width:135,height:44,color:"#F51A69",backgroundColor:"#FFF0A3",border:"2px solid",borderRadius:12,borderColor:"E72A63",margin:"30px 40px"}}> */}
  <Typography style={{fontSize:18,fontWeight:'bolder'}}>See More <NextPlan/></Typography>
   <Drawer
      anchor='right'
      open={open}
      onClose={()=>setOpen(false)}
    >
      sdss
      
<Button variant="contained"  onClick={()=>{setOpen(false)}} style={{width:160,height:55,color:"#F51A69",backgroundColor:"#FFF0A3",border:"2px solid",borderRadius:12,borderColor:"E72A63",margin:20}}>
  <Typography style={{fontSize:18,fontWeight:'bolder'}}>Cancel</Typography></Button>  
    </Drawer>  

  </Stack>
  </Stack>
  </Card>
//    ) }
  )
}

export default ViewJob