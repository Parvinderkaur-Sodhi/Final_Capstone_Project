import React from 'react'
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Stack,Typography}from '@mui/material';
import hrService from '../../../services/hr.service';
const FilterByStatus = () => {
     const [status, setstatus] = useState('');
const [job,setJob]=useState('');
  const handleChange = (event) => {
    setstatus(event.target.value);
 hrService.getJobByStatus(event.target.value).then((response)=>{
              console.log(response.data);
if(response.data.length>0){
          setJob(prevstate=>[...prevstate,response.data[0]]);
}
        }).catch(error =>{
            console.log(error);
        })
  };


  return (
<Stack direction={'row'} style={{margin:"50px 380px"}}>
      <Typography m={3}>Sort :</Typography>
      <FormControl sx={{mt:1,  minWidth: 120,height:-10 }}>
        <InputLabel id="demo-simple-select-helper-label" style={{marginTop:0}}>Category</InputLabel>
        <Select
          id="demo-simple-select-helper"
          value={status}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Stack>  )
}

export default FilterByStatus