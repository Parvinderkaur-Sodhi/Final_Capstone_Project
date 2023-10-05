import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import EmployeeService from "../../../services/employee.service";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem,
  Grid, InputLabel, FormControl, Card, CardContent, Typography
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import EmployeeNavbar from "../../DashBoardComponents/EmployeeNavbar";

function LeaveBalanceListUser(props) {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const leaveBalancesPerPage = 6; // Number of leave balances per page
  const { user: currentUser } = props;

  EmployeeService.getAllLeaveTypes()
    .then((response) => {
      setLeaveTypes(response.data.reverse());
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

  // Calculate the index range for the current page
  const indexOfLastBalance = currentPage * leaveBalancesPerPage;
  const indexOfFirstBalance = indexOfLastBalance - leaveBalancesPerPage;
  const currentBalances = filteredLeaveBalances.slice(indexOfFirstBalance, indexOfLastBalance);

  // Change the page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const Styles = {
    color: 'black',
    backgroundColor: "lightgrey",
    fontWeight: "bold",
  };

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <EmployeeNavbar />
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
              <TableHead style={{ backgroundColor: 'rgb(229, 229, 229)' }}>
                <TableRow style={Styles}>
                  <TableCell style={{ width: "10%" }}>ID</TableCell>
                  <TableCell style={{ width: "10%" }}>Employee Name</TableCell>
                  <TableCell style={{ width: "10%" }}>Leave Type</TableCell>
                  <TableCell style={{ width: "10%" }}>Balance Available</TableCell>
                  <TableCell style={{ width: "10%" }}>Leaves Used</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentBalances.map((leaveBalance) => (
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
          {/* Pagination */}
          <Grid container justifyContent="end" style={{ marginTop: "16px" }}>
            <Pagination
              count={Math.ceil(filteredLeaveBalances.length / leaveBalancesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default LeaveBalanceListUser;
