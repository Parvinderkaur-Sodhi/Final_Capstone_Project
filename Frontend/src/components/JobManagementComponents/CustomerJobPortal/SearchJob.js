import React, { useState } from 'react'
import {Stack,Typography,Button,Card,Paper,InputBase,Divider,IconButton, Drawer, CircularProgress} from '@mui/material';
import { Search } from '@mui/icons-material';
import hrService from '../../../services/hr.service';

const SearchJob = (props) => {
const [loading,setLoading]=useState(false);
const displayAllJobs=()=>{
     hrService.getAllJobs().then((response) => {
            props.setJob(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
}

    const searchByGroceryName=(val)=>{
      setLoading(true);
       console.log(val.length);
       if(val.length==0){
        displayAllJobs();
       }
       else{
 hrService.getJobByprofile(val).then((response)=>{
              console.log(response.data);
if(response.data.length>0){
                   props.setJob([]);
                   setLoading(false);
                   response.data.forEach((i)=>{
          props.setJob(prevstate=>[...prevstate,i]);
                   })
}
else{
  setLoading(false);
props.setJob([]);
}
        }).catch(error =>{
            console.log(error);
        })
      }
    }
  return (
    <>
<Paper
      style={{  display: 'flex', alignItems: 'center', width:500,height:50,border:"0px solid grey",borderRadius:40 }}
    >
       <InputBase
        style={{  padding:50,flex: 1 }}
        placeholder="Search for jobs"
        onChange = {event => searchByGroceryName(event.currentTarget.value)}

      />
  
      <Divider style={{ height: 50}} orientation="vertical" />
<IconButton color="primary" style={{ p: '10px' }} aria-label="directions">
<Search/>  </IconButton>
    </Paper> 
    </>
     )
}

export default SearchJob