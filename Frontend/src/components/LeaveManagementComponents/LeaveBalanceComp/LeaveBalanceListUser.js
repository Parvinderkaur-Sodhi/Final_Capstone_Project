import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import EmployeeService from "../../../services/employee.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, 
  Grid, InputLabel, FormControl, Card, CardContent, Typography } from "@mui/material";

function LeaveBalanceListUser(props) {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [filterType, setFilterType] = useState("");
  const { user: currentUser } = props;

  EmployeeService.getAllLeaveTypes()
    .then((response) => {
      setLeaveTypes(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  useEffect(() => {
    if (currentUser) {
      const employeeId = localStorage.getItem("employeeId");
      if (employeeId) {
        fetchLeaveBalancesByEmployeeId(employeeId);
      }
    }
  }, [currentUser]);

  const fetchLeaveBalancesByEmployeeId = async (employeeId) => {
    try {
      const response = await EmployeeService.getLeaveBalancesByEmpId(employeeId);
      setLeaveBalances(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredLeaveBalances = leaveBalances.filter((leaveBalance) => {
    const typeMatches = filterType === "" || leaveBalance.leaveType.typeName === filterType;
    return typeMatches;
  });

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Leave Balance
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  label="Type"
                >
                  <MenuItem value="">All</MenuItem>
                  {leaveTypes.map((type) => (
                    <MenuItem key={type.id} value={type.typeName}>
                      {type.typeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <br></br>
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
                {filteredLeaveBalances.map((leaveBalance) => (
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
        </CardContent>
      </Card>
    </div>
  );
}

export default LeaveBalanceListUser;
