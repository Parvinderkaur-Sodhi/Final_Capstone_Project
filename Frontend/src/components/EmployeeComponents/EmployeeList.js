import React, { useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';
import HrService from "../../services/hr.service";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Card, CardContent,
  CardActions, CardHeader, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment, Grid
} from "@mui/material";
import { Delete, Create, AddCircleOutline, Search } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';

function EmployeeList(props) {
  const [employees, setEmployees] = useState([]);
  const { user: currentUser } = props;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');

  const employeesPerPage = 4;
  const totalPageCount = Math.ceil(employees.length / employeesPerPage);

  useEffect(() => {
    HrService.getAllEmployees()
      .then((response) => {
        console.log("Employee data:", response.data);
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteClick = (employee) => {
    setSelectedEmployee(employee);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEmployee) {
      HrService.deleteEmployee(selectedEmployee.employeeId)
        .then(() => {
          setEmployees(employees.filter((emp) => emp.employeeId !== selectedEmployee.employeeId));
          setSelectedEmployee(null);
          setDeleteDialogOpen(false);
        })
        .catch((error) => {
          console.log("Error deleting employee:", error);
        });
    }
  };

  const handleDeleteCancel = () => {
    setSelectedEmployee(null);
    setDeleteDialogOpen(false);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.fname?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    employee.lname?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    employee.department?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    employee.email?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    employee.username?.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Card>
        <CardHeader className="title" title="Employee List" />
        <CardContent>
          <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                fullWidth
                margin="dense"
                InputLabelProps={{
                  shrink: true,
                }}
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <br></br>
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell width={"20px"}>Employee Status</TableCell>
                  <TableCell width={"220px"}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentEmployees.map((employee) => (
                  <TableRow key={employee.employeeId}>
                    <TableCell>{employee.employeeId}</TableCell>
                    <TableCell>{employee.fname ? employee.fname : "N/A"}</TableCell>
                    <TableCell>{employee.lname ? employee.lname : "N/A"}</TableCell>
                    <TableCell>{employee.department ? employee.department : "N/A"}</TableCell>
                    <TableCell>{employee.email ? employee.email : "N/A"}</TableCell>
                    <TableCell>{employee.username ? employee.username : "N/A"}</TableCell>
                    <TableCell>{employee.employeeStatus ? employee.employeeStatus : "N/A"}</TableCell>

                    <TableCell>
                      <Link to={`/update-employee/${employee.employeeId}`}>
                        <Button style={{ marginBottom: "10px" }} variant="outlined" startIcon={<Create />}>Edit</Button>
                      </Link>
                      &nbsp;
                      <Link to={`/view-employee/${employee.employeeId}`}>
                        <Button color="success" style={{ marginBottom: "10px" }} variant="outlined" startIcon={<Create />}>View</Button>
                      </Link>
                      {/* <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDeleteClick(employee)}>
                        Delete
                      </Button> */}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <CardActions>
            <Box display="flex" justifyContent="space-between" width="100%">
            <Box>
              <Link to="/register">
                <Button variant="outlined" color="success" startIcon={<AddCircleOutline />}>Register New Employee</Button>
              </Link>
            &nbsp;
              <Link to="/add-employee">
                <Button variant="outlined" color="success" startIcon={<AddCircleOutline />}>Add New Employee</Button>
              </Link>
              </Box>
              <Box>
                <Pagination count={totalPageCount} page={currentPage} onChange={handlePageChange} color="primary" />
              </Box>
            </Box>
          </CardActions>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen}>
        <DialogTitle>Delete Employee</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Employee?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EmployeeList;
