import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";

const localizer = momentLocalizer(moment);

function CalendarView({ leaveRequests }) {
  const events = leaveRequests.map((leaveRequest) => ({
    title: leaveRequest.employeeId.fname,
    start: new Date(leaveRequest.startDate),
    end: new Date(leaveRequest.endDate),
    status: leaveRequest.status, // Store status in event object
  }));

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: "gray", // Default color for unknown status
    };

    if (event.status === "Pending") {
      style.backgroundColor = "blue"; // Blue for Pending
    } else if (event.status === "Accepted") {
      style.backgroundColor = "green"; // Green for Accepted
    } else if (event.status === "Rejected") {
      style.backgroundColor = "red"; // Red for Rejected
    }

    return {
      style,
    };
  };

  return (
    <div style={{ height: 600 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter} // Apply custom event styles
      />
    </div>
  );
}

export default CalendarView;
