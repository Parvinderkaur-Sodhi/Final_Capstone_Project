import React from 'react'
import HrService from '../../../services/hr.service';
import { useEffect } from 'react';
import { useState } from 'react';
import {Stack,Typography,Button,Card,Paper,InputBase,Divider,IconButton, Drawer,Grid, Box, Dialog, Snackbar, Alert} from '@mui/material';
import SearchJob from './SearchJob';
import { ChairOutlined, ChangeCircle, CurrencyRupeeSharp } from '@mui/icons-material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import employeeService from '../../../services/employee.service';
const AllJob = (props) => {
      const [open,setOpen]=useState(false);
      const[success,setSuccess]=useState(false);
      const[error,setError]=useState(false);
      const[feedback,setFeedback]=useState(false);
      const[d,setD]=useState();
     const {empid}=useParams();
     const [applied,setApplied]=useState([]);
           const colors=["#e3dbfa","#fbe2f4","#ffe1cc",'#d4f6ed'];
const randomColor=colors[Math.floor(Math.random()*colors.length)];
      console.log(d);
    useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));
        getAlljobDetails();
    }, []);

    const getAlljobDetails = () => {
        HrService.getAllJobs().then((response) => {
            props.setJob(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }


    const ApplyforJob=(jobId)=>{
      const obj={};
      employeeService.applyforJob(empid,jobId,obj).then((response)=>{
        console.log(response.data.length);
        if(response.data.length==0){
          console.log("djcd");
        setError(true);
              setOpen(false);

        }
        else{
setSuccess(true);
      setOpen(false);

        }
        // setFeedback(true);
        // setApplied(true);
      })
    }
    const openDrawer=(index)=>{
setOpen(true);
setD(index);
    }
  return (
    <>
       {success && <Alert severity="success" onClose={()=>setSuccess(false)}>Successfully Applied</Alert>}
  {error && <Alert severity="error" onClose={()=>setError(false)}>ALREADY Applied</Alert>}

    <h4 style={{margin:"50px 34px"}}>Recommended Jobs :</h4>
    <Grid container sx={{mt:-4,ml:1}}>

{
  props.job &&  props.job.map((j,index)=>
    {
      const col=colors[index%colors.length];
      const date=new Date(j.publish_date);
      const currdate=new Date();
      var diff=currdate.getDate()-date.getDate();
      const profile=j.jobProfile;
// var days=diff/(1000*60*60*24);
      return (
    <>
    
       {/* <Card style={{width:230,height:270,margin:"5px 10px 10px",border:"1px solid",borderColor:"white",borderRadius:20,padding:5}}> */}
          <Card style={{width:220,height:200,border:"1px solid",margin:"5px 10px 10px",borderColor:"white",borderRadius:20,backgroundColor:col}}>
            <Stack>
              <Button variant="contained" sx={{bgcolor:"white",margin:"10px 20px",width:"100px",height:30,color:"black",border:"0px solid white",borderRadius:2,fontSize:10}} >{diff} days ago</Button>
               <Typography style={{fontSize:10,margin:"10px 20px 0px "}}>{j.category}</Typography>   
    <Typography style={{fontSize:20,fontWeight:'bolder',color:"purple",margin:"0px 20px"}}>{j.jobProfile}</Typography>   
<Stack direction="row">
  <Stack>
           <Typography style={{fontSize:10,margin:"15px 20px"}}>Last date : </Typography>   

       <Typography style={{fontSize:12,margin:"-10px 20px",fontWeight:"bolder"}}>{j.lastdate}</Typography>   
</Stack>
<Button variant="contained"  onClick={()=>{openDrawer(index)}} style={{width:70,height:30,backgroundColor:"black",color:"white",margin:"15px"}}>
  <Typography style={{fontSize:10}}>Details</Typography></Button>  
  

  </Stack>
 
{d!=null && <Drawer
      anchor='right'
      open={open}
      onClose={()=>setOpen(false)}
      PaperProps={{sx:{width:300}}}
    >
  
     {console.log(props.job[d])}
     {d!=null  && <Stack  padding={2}>
      <Box boxShadow={1} borderWidth='1px'  width="270px"  height="80px" backgroundColor="#c2c6be">
      <Typography style={{fontSize:20,fontWeight:'bolder',color:"black",margin:"0px 30px",textAlign:'center'}}>{(props.job[d]).jobProfile}</Typography>  
      <Stack direction='row'>
               <Typography style={{fontSize:15,margin:"10px 30px 0px "}}>{props.job[d].jobType}</Typography>  
               <Divider></Divider> 
               <Typography style={{fontSize:15,margin:"10px 35px 0px 4px"}}>{props.job[d].publish_date}</Typography>   
</Stack> 
      </Box>
      <Stack direction='row' mt={4} ml={5} marginBottom={4}>
        <div style={{marginRight:"44px"}}>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#9ADD56"><CurrencyRupeeSharp/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Salary</Typography>  

        <Typography style={{fontSize:15}}>Rs.{props.job[d].salary}</Typography>  

        </div>
          <div>
        <Box boxShadow={1} borderWidth='1px' borderRadius={10} p={1}  width="40px"  height="40px" backgroundColor="#e3dbfa"><ChairOutlined/></Box>
                <Typography style={{fontSize:15,color:"#909fa5"}}>Position</Typography>  

        <Typography style={{fontSize:15}}>{props.job[d].position}</Typography>  

        </div>
      </Stack>

      <h4>Description</h4>
      <Typography color="#5d6c72">{props.job[d].description}</Typography>
      <Typography mt={4} color="#5d6c72">{props.job[d].experience}</Typography>
      <Divider mt={3}/> 
            <Typography mt={4} color="#909fa5">Last Date to Apply :<strong>{props.job[d].lastdate}</strong></Typography>

            <Stack direction="row" mt={4}>
            <Button variant="outlined"  onClick={()=>{
              setOpen(false);
              setD()}} style={{width:110,height:40,color:'black'}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}>Cancel</Typography></Button>  
{/* {<Button variant="outlined"  disabled style={{width:150,height:40,backgroundColor:"purple",color:"white",marginLeft:10}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}>Applied</Typography></Button>  } */}
  {applied && <Button variant="outlined"  onClick={()=>{ApplyforJob(props.job[d].jobId)}} style={{width:150,height:40,backgroundColor:"#98144d",color:"white",marginLeft:10}}>
  <Typography style={{fontSize:15,fontWeight:'bolder'}}>Apply now</Typography></Button>  }
  <Snackbar open={feedback} autoHideDuration={6000} onClose={()=>setFeedback(false)}>
  <Alert onClose={()=>setFeedback(false)} severity="success" sx={{ width: '100%' }}>
    This is a success message!
  </Alert>s
</Snackbar>
  </Stack>
      </Stack>
    }
    </Drawer>  }

            </Stack>
</Card>


  </>
      )
    }
   ) }
   </Grid>

</>
  )
}

export default AllJob