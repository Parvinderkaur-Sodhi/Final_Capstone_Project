import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import HrService from "../../services/hr.service";
import {
    Card, CardContent, CardHeader, TextField, Button, Grid, Box, MenuItem, FormControl, InputLabel, Select,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { DatePicker } from '@mui/lab/DatePicker';
import "react-datepicker/dist/react-datepicker.css";

function AddEmployee(props) {
    const [employee, setEmployee] = useState({});
    const [addSuccess, setAddSuccess] = useState(false);
    const { user: currentUser } = props;

    // Validate email format
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    const handleFieldChange = (fieldName, value) => {
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            [fieldName]: value,
        }));
    };

    const handleAdd = () => {
        // Validate the phone number
        if (employee.phoneNumber && employee.phoneNumber.length !== 10) {
            alert("Phone number must be 10 digits.");
            return;
        }

        // Validate email format
        if (employee.email && !isValidEmail(employee.email)) {
            alert("Invalid email format.");
            return;
        }

        HrService.saveEmployee(employee)
            .then(() => {
                setAddSuccess(true);
            })
            .catch((error) => {
                console.log("Error adding employee:", error);
            });

    };

    if (addSuccess) {
        return <Redirect to="/employee-list" />;
    }

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Card>
                <CardHeader className="title" title="Add New Employee" />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="First Name"
                                value={employee.fname || ""}
                                onChange={(e) => handleFieldChange("fname", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Last Name"
                                value={employee.lname || ""}
                                onChange={(e) => handleFieldChange("lname", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    label="Gender"
                                    value={employee.gender || ""}
                                    onChange={(e) => handleFieldChange("gender", e.target.value)}
                                >
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Date of Birth"
                                type="date"
                                value={employee.dob || ""}
                                onChange={(e) => handleFieldChange("dob", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Department"
                                value={employee.department || ""}
                                onChange={(e) => handleFieldChange("department", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Email"
                                value={employee.email || ""}
                                onChange={(e) => handleFieldChange("email", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Phone No"
                                value={employee.phoneNumber || ""}
                                onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Date of Joining"
                                type="date"
                                value={employee.doJoining || ""}
                                onChange={(e) => handleFieldChange("doJoining", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Job Title"
                                value={employee.jobTitle || ""}
                                onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Address"
                                value={employee.address || ""}
                                onChange={(e) => handleFieldChange("address", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Permanent Address"
                                value={employee.paddress || ""}
                                onChange={(e) => handleFieldChange("paddress", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Addhar/Pan Card number"
                                value={employee.idNo || ""}
                                onChange={(e) => handleFieldChange("idNo", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Employee Status</InputLabel>
                                <Select
                                    value={employee.employeeStatus || ""}
                                    onChange={(e) =>
                                        handleFieldChange("employeeStatus", e.target.value)
                                    }
                                    label="Employee Status"
                                >
                                    <MenuItem value="Active">Active</MenuItem>
                                    <MenuItem value="InActive">InActive</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Date of Leaving"
                                type="date"
                                value={employee.doLeaving || ""}
                                onChange={(e) => handleFieldChange("doLeaving", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Employee Picture"
                                value={employee.employeePic || ""}
                                onChange={(e) => handleFieldChange("employeePic", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Resume"
                                value={employee.resume || ""}
                                onChange={(e) => handleFieldChange("resume", e.target.value)}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Box display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Add />}
                            onClick={handleAdd}
                        >
                            Add Employee
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
}

export default AddEmployee;
