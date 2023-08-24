import React from 'react'


import {  FormControl, Stack, styled, InputLabel, Select} from '@mui/material';

import { useState } from 'react';
import hrService from '../../../services/hr.service';
import { MenuItem } from '@material-ui/core';

const FilterHrJob = (props) => {
     const categoryList=["design","development","testing","sales"];
    const seniorityList=["Senior","Junior","Middle"];
    const jobType=["Full time","Part Time","Remote","Internship"];
    const experience=[1,2,3,"4 and above"];
    // const salary=[]
    // const [open,setOpen]=useState(false);
    // const[d,setD]=useState();
    const [category,setCategory]=useState();
    const [position,setPosition]=useState();
        const [exp,setExp]=useState();
    const [type,setType]=useState();

     const handleChangeCategory=(e)=>{
      console.log(e.target.value);
      setCategory(e.target.value);
      hrService.getJobBycategory(e.target.value).then((response)=>{
        console.log(response.data);
          const temp=props.job;
        props.setJob([]);
        temp.forEach((j)=>{
response.data.forEach((i)=>{
  if(j.category==i.category && j.jobId==i.jobId)
          {props.setJob((prev)=>[...prev,i]);}
     })  
        })
    
    })
    }
     const handleChangeSeniority=(e)=>{
      console.log(e.target.value);
      setPosition(e.target.value);
      hrService.getJobByPosition(e.target.value).then((response)=>{
        console.log(response.data);
        console.log(props.job);
        const temp=props.job;
        props.setJob([]);
           temp.forEach((j)=>{

response.data.forEach((i)=>{
  if(j.position==i.position && j.jobId==i.jobId)
          {props.setJob((prev)=>[...prev,i]);}
     })  
        })
      })
    }
    const handleChangeExp=(e)=>{
      console.log(e.target.value);
      setExp(e.target.value);
      hrService.getJobByExperience(e.target.value).then((response)=>{
        console.log(response.data);
        props.setJob(response.data);
      })
    }
 const handleChangeType=(e)=>{
      console.log(e.target.value);
      setType(e.target.value);
      hrService.getJobBytype(e.target.value).then((response)=>{
        console.log(response.data);
        props.setJob(response.data);
      })
    }

    const MySelect=styled(Select)({
        width:130,height:40,
    });

    const MyInputLabel=styled(InputLabel)({
color:"black",marginTop:-2
    })

    const MyFormControl=styled(FormControl)({
       marginLeft:30
    })
  return (
 <Stack direction="row">
      <MyFormControl>
          <MyInputLabel>Category</MyInputLabel>
 <MySelect
 labelId='demo-simple-MySelect-label'
 id="demo-simple-MySelect"
 label="category"
 value={category}
 onChange={(e)=>{handleChangeCategory(e)}}
 >
  
 {categoryList.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  
 </MySelect>
   
</MyFormControl>

 
    <MyFormControl>
  <MyInputLabel>Seniority</MyInputLabel>
  <MySelect
   
    // value={category}
    label="Category"
    onChange={(e)=>handleChangeSeniority(e)}
    // sx={{width:150,height:40,p:1}}
  >
    {seniorityList.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </MySelect>
</MyFormControl>
 
  <MyFormControl>
 <MyInputLabel>Experience</MyInputLabel>
 <MySelect
    // labelId="demo-simple-MySelect-label"
    // id="demo-simple-MySelect"
    // value={category}
    label="Category"
    onChange={(e)=>handleChangeExp(e)}
    // sx={{width:150,height:40,p:1}}
  >
    {experience.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
    </MySelect>
</MyFormControl>
 <MyFormControl>
  <MyInputLabel>Type</MyInputLabel>
  <MySelect
  
    value={type}
    onChange={(e)=>handleChangeType(e)}
  >
    {jobType.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </MySelect>
</MyFormControl>   
</Stack> 
 )
}

export default FilterHrJob