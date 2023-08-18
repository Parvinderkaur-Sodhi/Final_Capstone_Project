import React from 'react'
import FilterByStatus from './FilterByStatus'
import FilterJob from './FilterJob'
import SearchJob from './SearchJob'
import AppliedJobs from './AppliedJobs'
import  Stack  from '@mui/material/Stack'
import FilterByCategory from './FilterByCategory'
import { Box } from '@mui/material'

const TrackStatus = () => {
  return (
    
          <Stack direction="row" sx={{width:1734,height:596,margin:"-20px -500px",backgroundColor:"#F1F1F1"}}>
         <Box sx={{width:400,height:600,boxShadow:1,backgroundColor:"white",ml:46}}>
          jfjds
         </Box>
          {/* <Box >   */}
          <Stack sx={{ml:10}}>
          <Stack sx={{mt:2,ml:4}} direction="row">
  <SearchJob />
<FilterJob/>
          </Stack>
      
                <AppliedJobs/>
                </Stack>
   
<FilterByCategory/>

        </Stack>
       

  )
}

export default TrackStatus