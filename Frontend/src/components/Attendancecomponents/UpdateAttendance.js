import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { TextField, Button, Card, CardContent, CardActions, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { Done } from '@mui/icons-material';
import HrNavbar from '../DashBoardComponents/HrNavbar';
import HrService from '../../services/hr.service';

const useStyles = makeStyles((theme) => ({
  card: {
    width: '80%',
    margin: '0 auto',
    marginTop: theme.spacing(3),
    backgroundColor: "#f5f5f5",
    borderRadius: theme.spacing(1),
  },
  inputField: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: theme.spacing(3),
  },
  updateButton: {
    backgroundColor: "#98144d",
    color: "white",
    "&:hover": {
      backgroundColor: "#800c3d",
    },
  },
}));

function UpdateAttendance(props) {
  const { user: currentUser } = props;
  const { attendanceId, employeeId } = useParams();
  const [attendance, setAttendance] = useState({});
  const [present, setPresent] = useState('');
  const [absenceReason, setAbsenceReason] = useState('');
  const [redirectToList, setRedirectToList] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    HrService.getAttendanceByEmployeeId(employeeId)
      .then((response) => {
        const attendanceData = response.data;
        setAttendance(attendanceData);
        setPresent(attendanceData.present);
        setAbsenceReason(attendanceData.absenceReason);
      })
      .catch((error) => {
        console.log('Error fetching data', error);
      });
  }, [employeeId]);

  const handleUpdateAttendance = () => {
    const updatedAttendance = {
      attendanceId,
      present: present,
      absenceReason: absenceReason,
    };

    HrService.updateAttendance(attendanceId, updatedAttendance)
      .then((response) => {
        console.log('Attendance updated successfully', response.data);
        setRedirectToList(true);
      })
      .catch((error) => {
        console.log('Error updating data', error);
      });
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  if (redirectToList) {
    return <Redirect to="/attendance-list" />;
  }

  return (
    <div style={{ maxHeight: "84vh", overflowY: "auto", paddingRight: "17px" }}>
      <HrNavbar />
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Update Attendance
          </Typography>
          <hr />
          <TextField
            label="Present"
            variant="outlined"
            color="primary"
            value={present}
            onChange={(e) => setPresent(e.target.value)}
            fullWidth
            className={classes.inputField}
          />
          <TextField
            label="Absence Reason"
            variant="outlined"
            color="primary"
            value={absenceReason}
            onChange={(e) => setAbsenceReason(e.target.value)}
            fullWidth
            className={classes.inputField}
          />
        </CardContent>
        <CardActions>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.updateButton}
              startIcon={<Done />}
              onClick={handleUpdateAttendance}
            >
              Update Attendance
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default UpdateAttendance;


