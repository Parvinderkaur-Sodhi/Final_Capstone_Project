import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import ApplicationInfo from './ApplicationInfo';
import AppliedJobs from './AppliedJob';
import Status from './Status';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const Deatils = (props) => {
  const [value, setValue] = React.useState('Inprocess');
  const JobStatus=["Inprocess","Interview","Accepted","Rejected"];
  const {jobProfile}=useParams();
  console.log(jobProfile);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {
              JobStatus.map((i)=>(
                    <Tab label={i} value={i} />

              ))
            }
            
          </TabList>
        </Box>
         {
              JobStatus.map((i)=>(

        <TabPanel value={i}><Status jobProfile={jobProfile} status={i}/></TabPanel>
              ))}
        {/* <TabPanel value="2"><Status status="interviewed"/></TabPanel>
        <TabPanel value="3"><Status status="Accepted"/></TabPanel>
                <TabPanel value="4"><Status status="Rejected"/></TabPanel> */}

      </TabContext>
    </Box>
  );
}


export default Deatils