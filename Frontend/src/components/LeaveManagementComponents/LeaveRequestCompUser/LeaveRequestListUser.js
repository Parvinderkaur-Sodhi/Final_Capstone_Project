import React, { useState, useEffect } from "react";
import { Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import axios from "axios";
import employeeService from "../../../services/employee.service";

function LeaveRequestListUser() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    if (employeeId) {
      employeeService.getLeaveRequestByEmployeeId(employeeId)
        .then((response) => {
          setLeaveRequests(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [employeeId]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Leave Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.id}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LeaveRequestListUser;
