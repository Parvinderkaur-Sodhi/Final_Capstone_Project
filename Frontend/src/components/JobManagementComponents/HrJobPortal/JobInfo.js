import hrService from '../../../services/hr.service';
import {Stack,Typography,Button,Card,Paper,InputBase,Divider,IconButton, Drawer,Grid, Box, Dialog, Snackbar, Alert} from '@mui/material';
import { ChairOutlined, CurrencyRupeeSharp } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const JobInfo = () => {

    const [jobInfo,setJobInfo]=useState();
    const {jobProfile}=useParams();
    console.log(jobProfile);

    useEffect(()=>{
hrService.getJobByprofile("backend developer").then((response)=>{
    console.log(response.data);
    setJobInfo(response.data);
})
    },[])
  return (
<>
 {jobInfo && 
 <>
 <Box boxShadow={1} borderWidth='1px'  width="270px"  height="80px" backgroundColor="#c2c6be">
      <Typography style={{fontSize:20,fontWeight:'bolder',color:"black",margin:"0px 30px",textAlign:'center'}}>{jobInfo[0].jobProfile}</Typography>  
      <Stack direction='row'>
               <Typography style={{fontSize:15,margin:"10px 30px 0px "}}>{jobInfo[0].jobType}</Typography>  
               <Divider></Divider> 
               <Typography style={{fontSize:15,margin:"10px 35px 0px 4px"}}>{jobInfo[0].publish_date}</Typography>   
</Stack> 
      </Box>
      <Stack direction='row' mt={4} ml={5} marginBottom={4}>
        <div style={{marginRight:"44px"}}>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#9ADD56"><CurrencyRupeeSharp/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Salary</Typography>  

        <Typography style={{fontSize:15}}>Rs.{jobInfo[0].salary}</Typography>  

        </div>
          <div>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><ChairOutlined/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Position</Typography>  

        <Typography style={{fontSize:15}}>{jobInfo[0].position}</Typography>  

        </div>
      </Stack>

      <h4>Descriptions</h4>
      <Typography color="#5d6c72">{jobInfo[0].description}</Typography>
      <Typography mt={4} color="#5d6c72">{jobInfo[0].experience}</Typography>
      <Divider mt={3}/> 
            <Typography mt={4} color="#909fa5">Last Date to Apply :<strong>{jobInfo[0].lastdate}</strong></Typography>
  </>
  }
            </>
  )
}

export default JobInfo