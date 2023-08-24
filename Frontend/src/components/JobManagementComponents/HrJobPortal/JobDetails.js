import React from 'react'
import { Box, Tab, Tabs } from '@mui/material'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import ApplicationInfo from './ApplicationInfo';
import AppliedJobs from './AppliedJob';
import Status from './Status';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Details } from '@mui/icons-material';
import Deatils from './AllApplication';
import AllApplication from './AllApplication';
import JobInfo from './JobInfo';
const JobDetails = () => {
      const [value, setValue] = React.useState("Job Details");
 const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value} sx={{backgroundColor:"green"}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs onChange={handleChange} aria-label="lab API tabs example"
          TabIndicatorProps={{
            style:{
              color:"yellow"
            }
          }}
          
  indicatorColor="311D3F">
    
                    
<Tab label="Job Details" value="Job Details"/>
    <Tab label="Employee" value="Employee" />
            
          </Tabs>
        </Box>
        

        <TabPanel value="Employee"><AllApplication/></TabPanel>
                <TabPanel value="Job Details"><JobInfo/></TabPanel>

        {/* <TabPanel value="2"><Status status="interviewed"/></TabPanel>
        <TabPanel value="3"><Status status="Accepted"/></TabPanel>
                <TabPanel value="4"><Status status="Rejected"/></TabPanel> */}

      </TabContext>
    </Box>
  )
}

export default JobDetails