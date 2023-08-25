import React, { useState } from 'react'
import FilterJob from './FilterJob'
import SearchJob from './SearchJob'
import AllJob from './AllJob'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import FilterByCategory from './FilterByCategory'
import { CardGiftcard } from '@mui/icons-material'
const CustomerJobPortal = () => {
  const {empid}=useParams();
  const [job,setJob]=useState([]);
  const history=useHistory();
  return (
    <Stack direction="row" sx={{width:1734,height:596,margin:"-20px -500px",backgroundColor:"white"}}>
         <Box sx={{width:400,height:600,boxShadow:1,backgroundColor:"white",ml:46}}>
          jfjds
         </Box>
          {/* <Box >   */}
          <Stack sx={{ml:10}}>
          <Stack sx={{mt:2,ml:4}} direction="row">
  <SearchJob job={job} setJob={setJob}/>
    <Button 
    style={{width:150,height:40,backgroundColor:"#98144d",margin:"15px 35px",color:"white"}}
        variant="outlined"
        onClick={()=>{
          history.push(`/trackStatus/${empid}`);
        }}>Track Status</Button>
          </Stack>
      
                <AllJob job={job} setJob={setJob}/>
                </Stack>
   
<FilterByCategory job={job} setJob={setJob}/>

        </Stack>


  )
}

export default CustomerJobPortal