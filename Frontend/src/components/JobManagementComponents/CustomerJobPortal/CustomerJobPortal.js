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
    <Stack direction="row" sx={{width:1734,height:596,margin:"-20px -500px",backgroundColor:"#F1F1F1"}}>
         <Box sx={{width:400,height:600,boxShadow:1,backgroundColor:"white",ml:46}}>
          jfjds
         </Box>
          {/* <Box >   */}
          <Stack sx={{ml:10}}>
          <Stack sx={{mt:2,ml:4}} direction="row">
  <SearchJob job={job} setJob={setJob}/>
    <Button 
    sx={{width:100,height:44,ml:5,marginRight:10,fontSize:10,p:1}}
        variant="outlined"
        onClick={()=>{
          history.push(`/trackStatus/${empid}`);
        }}>Track Status</Button>
          </Stack>
      
                <AllJob job={job} setJob={setJob}/>
                </Stack>
    {/* </Box> */}
          {/* <div style={{width:350,height:800,marginRight:"-350px"}}>  
<FilterByCategory job={job} setJob={setJob}/>
</div> */}
<FilterByCategory job={job} setJob={setJob}/>

        </Stack>


  )
}

export default CustomerJobPortal