import React from 'react'


import {MenuItem,  FormControl, MenuList, Stack, styled, InputLabel, Select} from '@mui/material';

import { useState } from 'react';
import hrService from '../../../services/hr.service';

const FilterHrJob = (props) => {
     const categoryList=["design","development","testing","sales"];
    const seniorityList=["Senior","Junior","Middle"];
    const jobType=["Full time","Part Time","Remote","Internship"];
    const experience=[1,2,3,"4 and above"];
    // const salary=[]
    // const [open,setOpen]=useState(false);
    // const[d,setD]=useState();
    const [category,setCategory]=useState();
    const job=props.job;
    const setJob=props.setJob;
     const handleChangeCategory=(e)=>{
      console.log(e.target.value)
      hrService.getJobBycategory(e.target.value).then((response)=>{
        setJob(response.data);
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
  <>
 {categoryList.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
    </>
 </MySelect>
   
</MyFormControl>

 
    <MyFormControl>
  <MyInputLabel>Seniority</MyInputLabel>
  <MySelect
   
    value={category}
    label="Category"
    onChange={(e)=>handleChangeCategory(e)}
    // sx={{width:150,height:40,p:1}}
  >
    {seniorityList.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </MySelect>
</MyFormControl>
 <MyFormControl>
  <MyInputLabel>Salary</MyInputLabel>
  <MySelect
    labelId="demo-simple-MySelect-label"
    id="demo-simple-MySelect"
    value={category}
    label="Category"
    onChange={(e)=>handleChangeCategory(e)}
  >
    {categoryList.map((i)=>
    <MenuItem value={i}>{i}</MenuItem>
    )}
  </MySelect>
</MyFormControl>
  <MyFormControl>
 <MyInputLabel>Experience</MyInputLabel>
 <MySelect
    // labelId="demo-simple-MySelect-label"
    // id="demo-simple-MySelect"
    value={category}
    label="Category"
    onChange={(e)=>handleChangeCategory(e)}
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
  
    value={category}
    label="Category"
    onChange={(e)=>handleChangeCategory(e)}
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