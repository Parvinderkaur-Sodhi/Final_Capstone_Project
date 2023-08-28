import React, { useState } from 'react';
import FilterJob from './FilterJob';
import SearchJob from './SearchJob';
import AllJob from './AllJob';
import { Box, Button, Stack, Typography, Card, Grid } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import FilterByCategory from './FilterByCategory';
import { CardGiftcard } from '@mui/icons-material';
import EmployeeNavbar from "../../DashBoardComponents/EmployeeNavbar";

const CustomerJobPortal = () => {
  const { empid } = useParams();
  const [job, setJob] = useState([]);
  const history = useHistory();

  return (
<<<<<<< HEAD
<div>
            <EmployeeNavbar />

        <Card style={{ maxHeight: "84vh", overflowY: "auto", paddingRight: "17px"}}>

      <Stack direction="row">
 <div style={{width:"800px"}}>
            <div style={{marginLeft:"20px",marginTop:"20px"}}>
                      <SearchJob job={job} setJob={setJob} />
                      </div>
          <AllJob job={job} setJob={setJob} />
          </div>
                  <FilterByCategory job={job} setJob={setJob} />
      </Stack>


</Card>
</div>
=======
    <div>
      <EmployeeNavbar />
      <Card  style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px", padding: "20px" }}>
        <Stack direction="row">
          <Card style={{ width: "800px", marginRight: "6px", border: "none" }}>
            <div style={{ marginLeft: "20px", mt: "20px" }}>
              <SearchJob job={job} setJob={setJob} />
            </div>
            <AllJob job={job} setJob={setJob} />
          </Card>
          <FilterByCategory job={job} setJob={setJob} />
        </Stack> 
      </Card>
    </div>
>>>>>>> c8ef689ab8432346fd8847fcdda0d63f7fa554fd
  );
}

export default CustomerJobPortal;




// import React, { useState } from 'react'
// import FilterJob from './FilterJob'
// import SearchJob from './SearchJob'
// import AllJob from './AllJob'
// import { Box, Button, Stack, Typography, Card } from '@mui/material'
// import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
// import FilterByCategory from './FilterByCategory'
// import { CardGiftcard } from '@mui/icons-material'
// import EmployeeNavbar from "../../DashBoardComponents/EmployeeNavbar"
// const CustomerJobPortal = () => {
//   const { empid } = useParams();
//   const [job, setJob] = useState([]);
//   const history = useHistory();
//   return (
//     <>
//       <EmployeeNavbar />
//       <Stack direction="row" sx={{ backgroundColor: "white", marginLeft: 5 }}>

//         <Card sx={{ ml: 10 }}>
//           <div style={{ marginLeft: "20px" }}>
//             <SearchJob job={job} setJob={setJob} />
//           </div>

//           <AllJob job={job} setJob={setJob} />
//         </Card>

//         <FilterByCategory job={job} setJob={setJob} />

//       </Stack>
//     </>

//   )
// }

// export default CustomerJobPortal