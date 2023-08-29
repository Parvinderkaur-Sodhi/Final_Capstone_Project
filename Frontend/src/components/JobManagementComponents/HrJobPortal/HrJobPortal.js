import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import ViewJob from './ViewJob';
import { Button, Stack, Card } from '@mui/material';
import SearchJob from '../CustomerJobPortal/SearchJob';
import HrNavbar from "../../DashBoardComponents/HrNavbar";
import FilterByCategory from '../CustomerJobPortal/FilterByCategory';

const HrJobPortal = (props) => {
  const [job, setJob] = useState([]);
  const { user: currentUser } = props;
  console.log(job);

  return (
    <div>
      <HrNavbar />
      <Card style={{ maxHeight: "84vh", overflowY: "auto", paddingRight: "17px", padding: "20px"}}>
        <Stack direction="row" >
          <div style={{width:"800px"}}>
            <div style={{marginLeft:"20px",marginTop:"20px"}}>
                      <SearchJob job={job} setJob={setJob} />
                      </div>
            <ViewJob job={job} setJob={setJob} />
            </div>
          <FilterByCategory job={job} setJob={setJob} />
        </Stack>
        </Card>
    </div>
  );
}

export default HrJobPortal;




// import React, { useState } from 'react'
// import ViewJob from './ViewJob'
// import { Button, Stack,Card } from '@mui/material'
// import PostJob from './PostJob'
// import SearchJob from '../CustomerJobPortal/SearchJob'
// //import SideNavbar from '../../SideNavbar'
// import FilterHrJob from './FilterHrJob'
// // import Deatils from './Deatils'
// // import AppliedJobs from './AppliedJob'
// // import ApplicationInfo from './ApplicationInfo'
// import HrNavbar from "../../DashBoardComponents/HrNavbar";
// import FilterByCategory from '../CustomerJobPortal/FilterByCategory'

// const HrJobPortal = () => {
//   const [job,setJob]=useState([]);
//   console.log(job);
//   return (
//     <>
//     <HrNavbar/>
//     <Card style={{marginLeft:"150px",width:"1100px"}} >
//       <Stack direction="row">
//         <Card width="300px">
//    <div style={{margin:"30px 100px"}}>
//       <SearchJob job={job} setJob={setJob}/>
//       </div>  
//       <ViewJob job={job} setJob={setJob}/>
//       </Card>
//     <FilterByCategory job={job} setJob={setJob}/>
//         {/* <PostJob/> */}
//         </Stack>
//         </Card>
       
// </>  
// )
// }

// export default HrJobPortal