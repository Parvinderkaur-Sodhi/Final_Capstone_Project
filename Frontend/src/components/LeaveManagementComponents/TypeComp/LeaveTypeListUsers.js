import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import HrService from "../../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function LeaveTypeListUser(props) {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { user: currentUser } = props;

  useEffect(() => {
    HrService.getAllLeaveTypes()
      .then((response) => {
        console.log(response);
        setLeaveTypes(response.data);
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
      <h2>Leave Type List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Allowed Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveTypes.map((leaveType) => (
              <TableRow key={leaveType.typeId}>
                <TableCell>{leaveType.typeId}</TableCell>
                <TableCell>{leaveType.typeName}</TableCell>
                <TableCell>{leaveType.countAllowed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LeaveTypeListUser;
