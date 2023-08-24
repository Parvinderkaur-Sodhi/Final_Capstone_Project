import React from 'react'
import { Box, Stack, Tab, Tabs, styled } from '@mui/material'

// import ApplicationInfo from './ApplicationInfo';
import AppliedJobs from './AppliedJob';
import Status from './Status';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Details } from '@mui/icons-material';
import Deatils from './AllApplication';
import AllApplication from './AllApplication';
import JobInfo from './JobInfo';
import SideNavbar from '../../SideNavbar';
import TabPanel from '@mui/lab/TabPanel/TabPanel';
import TabContext from '@mui/lab/TabContext/TabContext';
import TabList from '@mui/lab/TabList/TabList';
const StyledTab = styled((props) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: 'black',
  '&.Mui-selected': {
    color:"#98144d",
    fontSize:24
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'red',
  },
}));

const StyledTabList = styled((props) => (
  <TabList
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#97144d',
  },
});
const JobDetails = () => {
      const [value, setValue] = React.useState("Job Details");
        const JobStatus=["Inprocess","Interviewed","Accepted","Rejected"];
  const {jobProfile}=useParams();

 const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  return (
    <Stack direction="row">
    <SideNavbar/>
      <Box sx={{ width:'100%'}}>
                  <TabContext value={value}>
<Box sx={{borderBottom:1,borderColor:'divider',padding:2}}>
         <StyledTabList
  onChange={handleChange}

  aria-label="secondary tabs example"
>
    
                    
<StyledTab label="Job Details" value="Job Details" style={{margin:"10px"}}/>
   {
              JobStatus.map((i)=>(
                    <StyledTab label={i} value={i} style={{margin:"10px"}}/>

              ))
            }
          </StyledTabList>
          </Box>
         {/* <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel> */}

    {
              JobStatus.map((i)=>(

        <TabPanel value={i}><Status jobProfile={jobProfile} status={i}/></TabPanel>
              ))}                
              <TabPanel value="Job Details"><JobInfo/></TabPanel>

     </TabContext>

    </Box>
    </Stack>
  )
}

export default JobDetails