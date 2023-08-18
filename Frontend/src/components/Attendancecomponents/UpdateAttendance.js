import React, { useState, useEffect } from 'react';
import HrService from "../../services/hr.service";
import {Redirect, useParams} from 'react-router-dom';
import {TextField, Button, Box, Card, CardContent, CardActions, CardHeader } from '@mui/material';
import {Done} from '@mui/icons-material'



function UpdateAttendance(props){
    const {user: currentUser} =props;
    const {attendanceId} =useParams();
    const {employeeId}=useParams();
    const [attendance, setAttendance]= useState({});
    const [present, setPresent]=useState("");
    const [absenceReason, setAbsenceReason]=useState("");
    const [redirectToList, setRedirectToList]=useState(false);


   useEffect(() =>{
    HrService.getAttendanceByEmployeeId(employeeId)
       .then((response) =>{
        const attendanceData=response.data;
        setAttendance(attendanceData);
        setPresent(attendanceData.present);
        setAbsenceReason(attendanceData.absenceReason);
       })
       .catch((error) =>{
        console.log("Error fetching data", error);
       });
   }, [attendanceId]);

   const handleUpdateAttendance =() =>{
    console.log("Updating attendance with Id: ", attendanceId)
    const updatedAttendance={
        attendanceId,
        present: present,
        absenceReason: absenceReason
    };

    console.log("Updated attendance data:", updatedAttendance);

    HrService.updateAttendance(attendanceId, updatedAttendance)
       .then((response) =>{
        console.log("Attendance updated successfully", response.data);
        setRedirectToList(true);
       })
       .catch((error) =>{
          console.log("error updating data", error);
       });

   };

   if(!currentUser){
    return <Redirect to="/login" />
  }
  if(redirectToList){
    return <Redirect to="/attendance-list" />
  }

  return(
    <div>
      <Card>
        <CardHeader title={`Update Attendance - ${attendance.present}`} />
        <hr></hr>
        <CardContent>
          <Box textAlign='center' margin={1} >
              <TextField
                    label="Present"
                   
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
                 onClick={handleUpdateAttendance}>
                  Update Attendance
                 </Button>

          </Box>
        </CardActions>
 
        
      </Card>
    </div>
  );
}


export default UpdateAttendance;