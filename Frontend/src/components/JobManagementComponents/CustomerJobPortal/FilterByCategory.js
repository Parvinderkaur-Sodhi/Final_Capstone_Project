import { Box, Button, Checkbox, FormControlLabel, Grid, Stack, Typography, makeStyles } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import hrService from '../../../services/hr.service';
import RangeSlider from './dd';

const FilterByCategory = (props) => {
           const jobcategory=["Design","Development","testing","Banking","Sales","Marketing"];
           const jobtype=["Full time","Part Time","Remote","Internship"];
           const [selectedFilters,setSelectedFilters]=useState([]);
const displayAllJobs=()=>{
      hrService.getAllJobs().then((response) => {
            props.setJob(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
}

const handleFilterJobType=(type)=>{
     if(selectedFilters.includes(type)){
     let filters=selectedFilters.filter((el)=>el!==type);
     setSelectedFilters(filters);
}
else{
     setSelectedFilters([...selectedFilters,type]);
}
}


const handleFilterButtononClick=(category)=>{
if(selectedFilters.includes(category)){
     let filters=selectedFilters.filter((el)=>el!==category);
     setSelectedFilters(filters);
}
else{
     setSelectedFilters([...selectedFilters,category]);
}
}


useEffect(()=>{

if(selectedFilters.length>0){
          props.setJob([]);

selectedFilters.forEach((cat)=>{
         console.log(cat);
 hrService.getJobBycategory(cat).then((response)=>{
              console.log(response.data);
response.data.forEach((i)=>{
          props.setJob(prevstate=>[...prevstate,i]);
     })
})
 hrService.getJobBytype(cat).then((response)=>{
              console.log(response.data);
response.data.forEach((i)=>{
          props.setJob(prevstate=>[...prevstate,i]);
     })
})
     })
}
else{
       displayAllJobs();
}

},[selectedFilters])
  return (
 <Box  boxShadow={1} borderWidth='1px'  width="280px" height="540px" backgroundColor="white">
      <h4 style={{margin:"10px 15px 20px 0px",textAlign:'center'}}>Filter</h4>

          <Grid container>
                <Typography ml={2} mr={10} textAlign='center'>Category</Typography>

      {jobcategory.map((value, index) => (
<Button 
variant="outlined"
onClick={
     ()=>handleFilterButtononClick(value)
}
style={selectedFilters?.includes(value)?{backgroundColor:"#98144d",color:"white",margin:"5px 10px 4px",width:110,height:30,padding:2}:{color:"black",margin:"5px 10px 4px",width:110,height:30,padding:2,borderColor:"#98144d"}}
>
     {value}
</Button>

                ))}
                </Grid>

<RangeSlider job={props.job} setJob={props.setJob}/>
   <Grid container mt={5}>
<Typography ml={2} mr={20}>Job Type</Typography>
      {jobtype.map((value, index) => (
<Button 
variant="outlined"
onClick={
     ()=>handleFilterJobType(value)
}
style={selectedFilters?.includes(value)?{backgroundColor:"#98144d",color:"white",margin:"5px 10px 4px",width:100,height:30,padding:3}:{color:"black",margin:"5px 10px 4px",width:100,maxWidth:150,height:30,padding:3,borderColor:"#98144d"}}
>
     {value}
</Button>

                ))}
                </Grid>
                                </Box>  
  )}
  export default FilterByCategory