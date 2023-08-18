import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Button, Stack,Typography}from '@mui/material';
import hrService from '../../../services/hr.service';
const FilterJob = () => {
     const [type, setType] = useState('');
const [job,setJob]=useState('');
  const handleChange = (event) => {
    console.log("sdcsd")
    setType(event.target.value);
 hrService.getJobBytype(event.target.value).then((response)=>{
              console.log(response.data);
if(response.data.length>0){
          setJob(prevstate=>[...prevstate,response.data[0]]);
}
        }).catch(error =>{
            console.log(error);
        })
  };
  return (
     <Stack direction="row">
                  <h1 margin={"70px 40px"} fontSize={20} fontWeight={'bold'}>AppliedJobs :</h1>
<Stack direction={'row'} style={{margin:"50px 380px"}}>
      <Typography m={3}>Sort :</Typography>
      <FormControl sx={{mt:1,  minWidth: 120,height:-10 }}>
        <InputLabel id="demo-simple-select-helper-label" style={{marginTop:0}}>Category</InputLabel>
        <Select
          id="demo-simple-select-helper"
          value={type}
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
    </Stack>
    </Stack>
  )
}

export default FilterJob