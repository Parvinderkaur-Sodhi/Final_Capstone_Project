import React, { useState } from 'react';
import FilterJob from './FilterJob';
import SearchJob from './SearchJob';
import AllJob from './AllJob';
import { Box, Button, Stack, Typography, Card } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import FilterByCategory from './FilterByCategory';
import { CardGiftcard } from '@mui/icons-material';
import EmployeeNavbar from "../../DashBoardComponents/EmployeeNavbar";

const CustomerJobPortal = () => {
  const { empid } = useParams();
  const [job, setJob] = useState([]);
  const history = useHistory();

  return (
    <div>
      <Card style={{ maxHeight: "84vh", overflowY: "auto", paddingRight: "17px"}}>
      <EmployeeNavbar />
      <Stack direction="row" sx={{ backgroundColor: "white" }}>
        <Card>
          <div style={{ marginLeft: "20px" }}>
            <SearchJob job={job} setJob={setJob} />
          </div>
          <AllJob job={job} setJob={setJob} />
        </Card>
        <FilterByCategory job={job} setJob={setJob} />
      </Stack>
      </Card>
    </div>
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