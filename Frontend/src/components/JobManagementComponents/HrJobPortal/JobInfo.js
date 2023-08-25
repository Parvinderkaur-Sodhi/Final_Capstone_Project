import hrService from '../../../services/hr.service';
import {Stack,Typography,Button,Card,Paper,InputBase,Divider,IconButton, Drawer,Grid, Box, Dialog, Snackbar, Alert} from '@mui/material';
import { ChairOutlined, CurrencyRupeeSharp, Timelapse } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const JobInfo = () => {

    const [jobInfo,setJobInfo]=useState();
    const {jobProfile}=useParams();
    console.log(jobProfile);

    useEffect(()=>{
hrService.getJobByprofile(jobProfile).then((response)=>{
    console.log(response.data);
    setJobInfo(response.data);
})
    },[])
  return (
<>
 {jobInfo && 
 <div style={{height:"400px"}}>
      <Typography style={{fontSize:25,fontWeight:'bolder',color:"#98144d",margin:"0px 30px"}}>{jobInfo[0].jobProfile}</Typography>  
    <Stack direction='row' mt={2} ml={5} marginBottom={1}>
        <div style={{marginRight:"44px"}}>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><CurrencyRupeeSharp/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Salary</Typography>  

        <Typography style={{fontSize:15}}>Rs.{jobInfo[0].salary}</Typography>  

        </div>
          <div style={{marginRight:"44px"}}>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><Timelapse/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>job Type</Typography>  

        <Typography style={{fontSize:15}}>{jobInfo[0].jobType}</Typography>  

        </div>
          <div>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><ChairOutlined/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Position</Typography>  

        <Typography style={{fontSize:15}}>{jobInfo[0].position}</Typography>  

        </div>
      </Stack>
        <Stack ml={1}>
               <Typography style={{fontSize:15,margin:"3px 30px 0px "}}>{jobInfo[0].jobType}</Typography>  
  <Typography style={{fontSize:15,margin:"4px 30px"}}>Published Date:{jobInfo[0].publish_date[2]}/{jobInfo[0].publish_date[1]}/{jobInfo[0].publish_date[0]}</Typography>   

               </Stack>
          
   
<Stack mt={1} ml={5}>
      <h5>Descriptions</h5>
      <Typography color="#5d6c72">{jobInfo[0].description}</Typography>
      <Typography mt={4} color="#5d6c72">{jobInfo[0].specializtion}</Typography>
            <Typography mt={10} color="#909fa5">Last Date to Apply :<strong>{jobInfo[0].lastdate[2]}-{jobInfo[0].lastdate[1]}-{jobInfo[0].lastdate[0]}</strong></Typography>
              <Typography mt={4} color="#909fa5">Total position Availabel:<strong>{jobInfo[0].vacancy}</strong></Typography>
</Stack>
  </div>
  }
            </>
  )
}

export default JobInfo