import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import HrService from "../../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function LeaveRequestList(props) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const { user: currentUser } = props;

  useEffect(() => {
    HrService.getAllLeaveRequest()
      .then((response) => {
        console.log(response)
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
      <h2>Leave Request List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              {/* Other relevant fields */}
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((leaveRequest) => (
              <TableRow key={leaveRequest.id}>
                <TableCell>{leaveRequest.id}</TableCell>
                <TableCell>{leaveRequest.employeeId}</TableCell>
                <TableCell>{leaveRequest.leaveType}</TableCell>
                <TableCell>{leaveRequest.startDate}</TableCell>
                <TableCell>{leaveRequest.endDate}</TableCell>
                {/* Render other relevant fields */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LeaveRequestList;
