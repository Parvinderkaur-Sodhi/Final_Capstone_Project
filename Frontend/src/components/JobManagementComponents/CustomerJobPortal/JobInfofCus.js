import React, { useEffect, useState } from 'react'
import hrService from '../../../services/hr.service';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import { ChairOutlined, CurrencyRupeeSharp, Timelapse } from '@mui/icons-material';

const JobInfofCus = (props) => {
    const [emp,setEmp]=useState();
useEffect(()=>{
hrService.getJobById(props.index).then((response)=>{
    console.log(response.data);
    setEmp(response.data);
})
},[])
  return (
    <>
    {emp!=null  && <Stack  padding={1}>
      <Typography style={{fontSize:20,fontWeight:'bolder',color:"#98144d",margin:"0px 30px",textAlign:'center'}}>{(emp).jobProfile}</Typography>  
       <Stack direction='row' mt={2} ml={5} marginBottom={4}>
        <div style={{marginRight:"44px"}}>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><CurrencyRupeeSharp/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Salary</Typography>  

        <Typography style={{fontSize:15}}>Rs.{emp.salary}</Typography>  

        </div>
          <div style={{marginRight:"44px"}}>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><Timelapse/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>job Type</Typography>  

        <Typography style={{fontSize:15}}>{emp.jobType}</Typography>  

        </div>
          <div>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><ChairOutlined/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Position</Typography>  

        <Typography style={{fontSize:15}}>{emp.position}</Typography>  

        </div>
      </Stack>
      <Stack ml={5}>
               <Typography style={{fontSize:15,margin:"1px 0px",color:"#5d6c72"}}>Team :{emp.category}</Typography>  
               <Typography style={{fontSize:15,margin:"3px 0px",color:"#5d6c72"}}>Published at: {emp.publish_date[2]}/{emp.publish_date[1]}/{emp.publish_date[0]}</Typography>   
</Stack> 
    
<Stack ml={5} mt={2}>
      <h5>Description</h5>
      <Typography color="#5d6c72">{emp.description}</Typography>
      <Typography mt={4} color="#5d6c72">{emp.experience}</Typography>
      <Divider mt={3}/> 
            <Typography mt={4} color="#909fa5">Last Date to Apply :<strong>{emp.lastdate[2]}/{emp.lastdate[1]}/{emp.lastdate[0]}</strong></Typography>
   <Typography mt={2} color="#909fa5">No of Vacancy:<strong>{emp.vacancy}</strong></Typography>
 </Stack>
            <Stack direction="row" mt={4} ml={5}>
            <Button variant="contained"  onClick={()=>{
              props.setOpen(false);
              props.setD()}} style={{width:110,height:40,backgroundColor:'#98144d',color:"white"}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}>Close</Typography></Button>  

 
 
  </Stack>
      </Stack>
    }
    </>
  )
}

export default JobInfofCus