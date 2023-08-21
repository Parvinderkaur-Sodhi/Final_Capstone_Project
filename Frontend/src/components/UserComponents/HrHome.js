import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HrService from "../../services/hr.service";
import CalendarView from "../CalenderView"; 

function HrHome(props) {
  const { user: currentUser } = props;
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [calendarView, setCalendarView] = useState(true);

  useEffect(() => {

    HrService.getAllLeaveRequests()
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <IconButton
            color="primary"
            aria-label="toggle-view"
            onClick={() => setCalendarView(!calendarView)}
            style={{ marginBottom: "10px" }}
          >
            <CalendarTodayIcon /> &nbsp;
            <Typography variant="body2">Calendar View</Typography>
          </IconButton>

          {calendarView && (
            <CalendarView leaveRequests={leaveRequests} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default HrHome;
