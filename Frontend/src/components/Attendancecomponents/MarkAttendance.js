import React, { useState } from 'react';
import HrService from "../../services/hr.service";
import {Redirect, useParams} from 'react-router-dom';
import {TextField, Button, Box, Card, CardContent, CardActions, CardHeader } from '@mui/material';
import {Done} from '@mui/icons-material'

function MarkAttendance(props){
  const {employeeId}=useParams();
  const [present, setPresent] = useState('');
  const [absenceReason, setAbsenceReason] = useState('');
  const [redirectToList, setRedirectToList]=useState(false);
  const {user: currentUser} =props;

  const handleMarkAttendance = () =>{
    const typedata={
      //employeeId: employeeId,
      present: present,
      absenceReason: absenceReason,
    };

    HrService.markAttendance(employeeId, typedata)
      .then((response) =>{
        setRedirectToList(true);
      })
      .catch((error) =>{
        console.log("Error adding attendance", error);
      });
  };


  if(!currentUser){
    return <Redirect to="/login" />
  }
  
  if(redirectToList){
    return <Redirect to={`/attendance-list`} />
  }


  return(
    <div>
      <Card>
        <CardHeader className='title' title='Add Attendance' />
        <hr></hr>
        <CardContent>
          <Box textAlign='center' margin={1} >
             
              <TextField
                    label="Attendance status"
                    
                    varient='outlined'
                    value={present}
                    onChange={(e) => setPresent(e.target.value)}
              />
              &nbsp; &nbsp;
              <TextField
                    label="Absence Reason"
                    
                    varient='outlined'
                    value={absenceReason}
                    onChange={(e) => setAbsenceReason(e.target.value)}
              />


          </Box>

        </CardContent>
        <CardActions>
          <Box display='flex' justifyContent="center" width="100%">
            <Button
                 variant='outlined'
                 color='success'
                 startIcon={<Done />}
                 onClick={handleMarkAttendance}>
                  Mark Attendance
                 </Button>

          </Box>
        </CardActions>
 
        
      </Card>
    </div>
  );
}

export default MarkAttendance;