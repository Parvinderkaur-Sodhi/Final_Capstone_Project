import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import HrService from "../../../services/hr.service";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField, InputLabel,
  FormControl, Select, MenuItem, Card, CardContent, Typography
} from "@mui/material";
import HrNavbar from "../../DashBoardComponents/HrNavbar";
import Pagination from "@mui/material/Pagination";

function LeaveBalanceList(props) {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const leaveBalancesPerPage = 6; // Number of leave balances per page
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
    HrService.getAllLeaveTypes()
      .then((response) => {
        setLeaveTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filteredLeaveBalances = leaveBalances.filter((leaveBalance) => {
    const typeMatches = filterType === "" || leaveBalance.leaveType.typeName === filterType;
    const employeeNameMatches = leaveBalance.employee.fname.toLowerCase().includes(filterText.toLowerCase());

    return typeMatches && employeeNameMatches;
  });

  // Calculate the index range for the current page
  const indexOfLastBalance = currentPage * leaveBalancesPerPage;
  const indexOfFirstBalance = indexOfLastBalance - leaveBalancesPerPage;
  const currentBalances = filteredLeaveBalances.slice(indexOfFirstBalance, indexOfLastBalance);

  // Change the page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };


  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <HrNavbar />
      <Card>
        <CardContent>
          <div style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px" }}>
            <Typography variant="h5" gutterBottom>
              Leave Balance
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <TextField
                  label="Search"
                  variant="outlined"
                  fullWidth
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </Grid>
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
            {/* Pagination */}
            <Grid container justifyContent="end" style={{ marginTop: "16px" }}>
              <Pagination
                count={Math.ceil(filteredLeaveBalances.length / leaveBalancesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Grid>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LeaveBalanceList;

