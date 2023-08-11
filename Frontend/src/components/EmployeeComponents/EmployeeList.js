import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import HrService from "../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function EmployeeList(props) {
  const [employees, setEmployees] = useState([]);
  const { user: currentUser } = props;

  useEffect(() => {
    HrService.getAllEmployees()
      .then((response) => {
        console.log("Employee data:", response.data); // Add this line for debugging
        setEmployees(response.data);
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
      <h2>Employee List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Phone no</TableCell>
              <TableCell>Date of Joinig</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Employee Status</TableCell>
              <TableCell>Employee Picture</TableCell>
              <TableCell>Resume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.employeeId}>
                <TableCell>{employee.employeeId}</TableCell>
                <TableCell>{employee.fname}</TableCell>
                <TableCell>{employee.lname}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.dob}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>{employee.doJoining}</TableCell>
                <TableCell>{employee.jobTitle}</TableCell>
                <TableCell>{employee.employeeStatus}</TableCell>
                <TableCell>{employee.employeePic || "N/A"}</TableCell>
                <TableCell>{employee.resume || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default EmployeeList;