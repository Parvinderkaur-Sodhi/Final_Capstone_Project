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
              <TableCell style={{ width: "10%" }}>ID</TableCell>
              <TableCell style={{ width: "10%" }}>Employee Name</TableCell>
              <TableCell style={{ width: "10%" }}>Leave Type</TableCell>
              <TableCell style={{ width: "10%" }}>Balance</TableCell>
              <TableCell style={{ width: "10%" }}>Leaves Used</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveBalances.map((leaveBalance) => (
              <TableRow key={leaveBalance.balanceId}>
                <TableCell>{leaveBalance.balanceId}</TableCell>
                <TableCell>{leaveBalance.employee.fname}</TableCell>
                <TableCell>{leaveBalance.leaveType.typeName}</TableCell>
                <TableCell>{leaveBalance.balance}</TableCell>
                <TableCell>{leaveBalance.leaveType.countAllowed - leaveBalance.balance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LeaveBalanceList;

