import React, { useState } from 'react'
import ViewJob from './ViewJob'
import { Button, Stack } from '@mui/material'
import PostJob from './PostJob'
import SearchJob from '../CustomerJobPortal/SearchJob'
<<<<<<< HEAD
//import SideNavbar from '../../SideNavbar'
=======
>>>>>>> 047918b04d7cf906810b4a8a3df073b40b185c3e
import FilterHrJob from './FilterHrJob'
// import Deatils from './Deatils'
// import AppliedJobs from './AppliedJob'
// import ApplicationInfo from './ApplicationInfo'

const HrJobPortal = () => {
  const [job,setJob]=useState([]);
  console.log(job);
  return (
    <>
  <Stack direction="row">
    {/* <h1>chkxudhcu</h1> */}
    {/* <SideNavbar/> */}
    <div  style={{width:1300,backgroundColor:"#F1F1F1"}}>
      <div style={{margin:"30px 100px"}}>
      <SearchJob job={job} setJob={setJob}/>
      </div>  
      {/* <FilterHrJob job={job} setJob={setJob}/> */}
      <ViewJob job={job} setJob={setJob}/>
        </div>
        {/* <PostJob/> */}
        </Stack>
</>  )
}

export default HrJobPortal