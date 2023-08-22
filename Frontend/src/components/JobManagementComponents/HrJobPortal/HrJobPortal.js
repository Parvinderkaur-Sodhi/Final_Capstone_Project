import React from 'react'
import ViewJob from './ViewJob'
import { Button, Stack } from '@mui/material'
import PostJob from './PostJob'
// import Deatils from './Deatils'
// import AppliedJobs from './AppliedJob'
// import ApplicationInfo from './ApplicationInfo'

const HrJobPortal = () => {
  return (
    <Stack  sx={{width:1100,height:596,backgroundColor:"#F1F1F1"}}>
      {/* <AppliedJobs/> */}
      <PostJob/>
        {/* <ApplicationInfo/> */}
        </Stack>
  )
}

export default HrJobPortal