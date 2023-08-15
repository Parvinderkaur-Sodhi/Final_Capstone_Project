import React, { useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';
import HrService from "../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Card, CardContent, CardActions, CardHeader, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Delete, Create, AddCircleOutline } from '@mui/icons-material';

function EmployeeList(props) {
  const [employees, setEmployees] = useState([]);
  const { user: currentUser } = props;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Card>
        <CardHeader className="title" title="Employee List" />
        <CardContent>
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
                  <TableCell>Employee Status</TableCell>
                  <TableCell width={"20px"}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.employeeId}>
                    <TableCell>{employee.employeeId}</TableCell>
                    <TableCell>{employee.fname}</TableCell>
                    <TableCell>{employee.lname}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.username}</TableCell>
                    <TableCell>{employee.employeeStatus}</TableCell>
                    <TableCell>
                      <Link to={`/update-employee/${employee.employeeId}`}>
                        <Button style={{ marginBottom: "10px" }} variant="outlined" startIcon={<Create />}>MORE</Button>
                      </Link>
                      &nbsp;
                      <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDeleteClick(employee)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <CardActions>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Link to="/register">
                <Button variant="outlined" color="success" startIcon={<AddCircleOutline />}>Register New Employee</Button>
              </Link>
              &nbsp;
              <Link to="/add-employee">
                <Button variant="outlined" color="success" startIcon={<AddCircleOutline />}>Add New Employee</Button>
              </Link>
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
