
import React from 'react'
import HrService from '../../../services/hr.service';

import {Stack,Typography,Button,Card,Paper,InputBase,Divider,IconButton, Drawer,Grid, Box, Dialog, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
// import SearchJob from './SearchJob';
import { ChairOutlined, ChangeCircle, CurrencyRupeeSharp } from '@mui/icons-material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect } from 'react';
import { useState } from 'react';
import employeeService from '../../../services/employee.service';
import hrService from '../../../services/hr.service';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ViewJob = () => {
    const [job, setJob] = useState([]);
    const categoryList=["design","development","testing","sales"];
    const seniorityList=["Senior","Junior","Middle"];
    const jobType=["Full time","Part Time","Remote","Internship"];
    const experience=[1,2,3,"4 and above"];
    // const salary=[]
    const [open,setOpen]=useState(false);
    const[d,setD]=useState();
    const [category,setCategory]=useState();
    const history=useHistory();
    useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));
const token=user["accessToken"];
        getAllCustomerDetails(token);
    }, []);
   const openDrawer=(index)=>{
setOpen(true);
setD(index);
    }
    const getAllCustomerDetails = (token) => {
        employeeService.getAllJobs(token).then((response) => {
            setJob(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }


    const handleChangeCategory=(e)=>{
      console.log(e.target.value)
      hrService.getJobBycategory(e.target.value).then((response)=>{
        setJob(response.data);
      })
    }

    const ViewAppliedJobs=(jobProfile)=>{
history.push(`/AppliedJobs/${jobProfile}`);
    }
  return (
      <>
      <Stack direction="row">
      <FormControl fullWidth>
  <InputLabel sx={{mt:-1}}>Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    onChange={(e)=>handleChangeCategory(e)}
    sx={{width:150,height:40,p:1}}
  >
    {categoryList.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </Select>
</FormControl>
  <FormControl fullWidth>
  <InputLabel sx={{mt:-1}}>Seniority</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    onChange={(e)=>handleChangeCategory(e)}
    sx={{width:150,height:40,p:1}}
  >
    {seniorityList.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </Select>
</FormControl>
  <FormControl fullWidth>
  <InputLabel sx={{mt:-1}}>Salary</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    onChange={(e)=>handleChangeCategory(e)}
    sx={{width:150,height:40,p:1}}
  >
    {categoryList.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </Select>
</FormControl>
 <FormControl fullWidth>
  <InputLabel sx={{mt:-1}}>Experience</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    onChange={(e)=>handleChangeCategory(e)}
    sx={{width:150,height:40,p:1}}
  >
    {experience.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </Select>
</FormControl>
 <FormControl fullWidth>
  <InputLabel sx={{mt:-1}}>Type</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Category"
    onChange={(e)=>handleChangeCategory(e)}
    sx={{width:150,height:40,p:1}}
  >
    {jobType.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </Select>
</FormControl>
</Stack>
    <h4 style={{margin:"50px 34px"}}>Recommended Jobs :</h4>
    <Grid container sx={{mt:-4,ml:1}}>

{
job &&  job.map((j,index)=>
    {
    
      const date=new Date(j.publish_date);
      const currdate=new Date();
      var diff=currdate.getDate()-date.getDate();
// var days=diff/(1000*60*60*24);
      return (
    <>
    
          <Card style={{width:320,height:200,border:"2px solid",margin:"5px 10px 10px",borderColor:"#E72A63",borderRadius:10,backgroundColor:"white"}}>
            <Stack>
              <Typography variant="contained" sx={{bgcolor:"white",margin:"10px 20px",width:"100px",height:30,color:"black",border:"0px solid white",borderRadius:2,fontSize:10}} >{diff} days ago</Typography>
               <Typography style={{fontSize:10,margin:"10px 20px 0px "}}>{j.category}</Typography>   
    <Typography style={{fontSize:20,fontWeight:'bolder',color:"black",margin:"0px 20px"}}>{j.jobProfile}</Typography> 
    <Stack direction="row" mt={1} ml={3}>
      <Button variant="outlined" sx={{width:"100px",fontSize:10}}>Part Time</Button>
            <Button variant="outlined" sx={{width:"100px",fontSize:10,ml:2}}>Part Time</Button>

      </Stack>  
<Stack direction="row">
  <Stack>
           <Typography style={{fontSize:10,margin:"15px 20px"}}>Last date : </Typography>   

       <Typography style={{fontSize:12,margin:"-10px 20px",fontWeight:"bolder"}}>{j.lastdate}</Typography>   
</Stack>
<Button variant="contained"  onClick={()=>{openDrawer(index)}} style={{width:70,height:30,backgroundColor:"black",color:"white",margin:"15px 20px"}}>
  <Typography style={{fontSize:10}} onClick={()=>{ViewAppliedJobs(j.jobProfile)}}>Details</Typography></Button>  
  

  </Stack>
 

  
            </Stack>
</Card>


  </>
      )
    }
   ) 
   }
   </Grid>
</>
  )
}

export default ViewJob