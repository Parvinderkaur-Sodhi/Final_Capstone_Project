import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HrService from "../../services/hr.service";
import { Card, CardContent, Typography, Grid, Avatar, Box } from "@mui/material";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";

function EmployeeDetails() {
  const [employee, setEmployee] = useState({});
  const employeeId = localStorage.getItem("employeeId");

  useEffect(() => {
    HrService.getEmployeeById(employeeId)
      .then((response) => {
        console.log("Employee data:", response.data);
        setEmployee(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [employeeId]);

  return (
    <div>
      <EmployeeNavbar />
      <Card sx={{ backgroundColor: "#f5f5f5", padding: 3, borderRadius: 2, boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)" }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Avatar alt={`${employee.fname} ${employee.lname}`} src={employee.employeePic} sx={{ width: 120, height: 120 }} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h5" gutterBottom>
                Employee ID {employee.employeeId}
              </Typography>
              <Typography variant="body1">
                <strong>User ID:</strong> {employee.userId}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {employee.email}
              </Typography>
              <Typography variant="body1">
                <strong>First Name:</strong> {employee.fname}
              </Typography>
              <Typography variant="body1">
                <strong>Last Name:</strong> {employee.lname}
              </Typography>
              <Typography variant="body1">
                <strong>Employee Status:</strong> {employee.employeeStatus}
              </Typography>
              <Typography variant="body1">
                <strong>Gender:</strong> {employee.gender}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box mt={2}>
                <Typography variant="body1">
                  <strong>Department:</strong> {employee.department}
                </Typography>
                <Typography variant="body1">
                  <strong>Phone No:</strong> {employee.phoneNumber}
                </Typography>
                <Typography variant="body1">
                  <strong>Date of Joining:</strong> {employee.doJoining}
                </Typography>
                <Typography variant="body1">
                  <strong>Job Title:</strong> {employee.jobTitle}
                </Typography>
                <Typography variant="body1">
                  <strong>Current Address:</strong> {employee.address}
                </Typography>
                <Typography variant="body1">
                  <strong>Permanent Address:</strong> {employee.paddress}
                </Typography>
                <Typography variant="body1">
                  <strong>DOB:</strong> {employee.dob}
                </Typography>
                <Typography variant="body1">
                  <strong>Addhar Id:</strong> {employee.idNo}
                </Typography>
                <Typography variant="body1">
                  <strong>Pan Card:</strong> {employee.other}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmployeeDetails;
