import React, { useState } from 'react'
import FilterJob from './FilterJob'
import SearchJob from './SearchJob'
import AllJob from './AllJob'
<<<<<<< HEAD
import { Box, Button, Stack, Typography ,Card} from '@mui/material'
=======
import { Box, Button, Stack, Typography, Card } from '@mui/material'
>>>>>>> 7c57eeb3501863caa70e8882a8879ea2e3711ca3
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import FilterByCategory from './FilterByCategory'
import { CardGiftcard } from '@mui/icons-material'
import EmployeeNavbar from "../../DashBoardComponents/EmployeeNavbar"
const CustomerJobPortal = () => {
  const { empid } = useParams();
  const [job, setJob] = useState([]);
  const history = useHistory();
  return (
    <>
    <EmployeeNavbar/>
    <Stack direction="row" sx={{backgroundColor:"white",marginLeft:5}}>
        
          <Card sx={{ml:10}}>
            <div style={{marginLeft:"20px"}}>
  <SearchJob job={job} setJob={setJob}/>
  </div>
      
                <AllJob job={job} setJob={setJob}/>
                </Card>
   
<FilterByCategory job={job} setJob={setJob}/>

        </Stack>
</>

  )
}

export default CustomerJobPortal