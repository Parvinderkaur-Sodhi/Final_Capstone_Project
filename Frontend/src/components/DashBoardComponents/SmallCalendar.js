import React from "react";
import {Calendar} from "react-calendar";
import "react-calendar/dist/Calendar.css";

function SmallCalendar({ leaveRequests }) {
  // Filter and map accepted leave requests to events
  const events = leaveRequests
    .filter((leaveRequest) => leaveRequest.status === "Accepted")
    .map((leaveRequest) => ({
      title: leaveRequest.employeeId.fname,
      startDate: new Date(leaveRequest.startDate),
      endDate: new Date(leaveRequest.endDate),
    }));

  return (
    <div>
      <Calendar
        view="month" // Display only the current month
        tileContent={({ date }) => {
          const event = events.find(
            (event) =>
              date >= event.startDate && date <= event.endDate
          );

          return (
            <div>
              {event && (
                <div
                  style={{
                    backgroundColor: "blue", // Background color for the line
                    height: "2px",
                    margin: "0 -10px",
                  }}
                />
              )}
              {event && date.getTime() === event.startDate.getTime() && (
                <div
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    padding: "2px",
                    borderRadius: "4px",
                    position: "absolute",
                    top: "-20px", // Adjust the positioning here
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1,
                  }}
                >
                  {event.title}
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}

export default SmallCalendar;
