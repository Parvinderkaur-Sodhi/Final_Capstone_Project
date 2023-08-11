import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import HrService from "../../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function LeaveBalanceList(props) {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const { user: currentUser } = props;

  useEffect(() => {
    HrService.getAllLeaveBalances()
      .then((response) => {
        console.log(response);
        setLeaveBalances(response.data);
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
      <h2>Leave Balance List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Employee ID</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveBalances.map((leaveBalance) => (
              <TableRow key={leaveBalance.id}>
                <TableCell>{leaveBalance.id}</TableCell>
                <TableCell>{leaveBalance.employeeId}</TableCell>
                <TableCell>{leaveBalance.leaveType}</TableCell>
                <TableCell>{leaveBalance.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LeaveBalanceList;
