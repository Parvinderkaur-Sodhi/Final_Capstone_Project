import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { Typography, Paper, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import employeeService from "../../../services/employee.service";

function AddLeaveRequestUser(props) {
    const { user: currentUser } = props;
    const history = useHistory();
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveRequest, setLeaveRequest] = useState({
        leaveTypeId: "",
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);

    useEffect(() => {
        employeeService.getAllLeaveTypes()
            .then((response) => {
                setLeaveTypes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "startDate") {
            const today = new Date();
            const newStartDate = new Date(value);

            if (newStartDate < today) {
                setStartDateError(true);
            } else {
                setStartDateError(false);
            }
        } else if (name === "endDate") {
            const newEndDate = new Date(value);
            const startDate = new Date(leaveRequest.startDate);

            if (newEndDate < startDate) {
                setEndDateError(true);
            } else {
                setEndDateError(false);
            }
        }

        setLeaveRequest((prevRequest) => ({
            ...prevRequest,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (startDateError || endDateError) {
            return;
        }

        const requestData = {
            employeeId: {
                employeeId: localStorage.getItem("employeeId")
            },
            leaveTypeName: { typeId: leaveRequest.leaveTypeId },
            startDate: leaveRequest.startDate,
            endDate: leaveRequest.endDate,
            reason: leaveRequest.reason,
        };

        employeeService.saveLeaveRequest(requestData)
            .then(() => {
                console.log("Leave request added successfully");
                history.push("/leave-request-user");
            })
            .catch((error) => {
                console.log("Error adding leave request:", error);
            });
    };

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Add Leave Request
            </Typography>
            <Paper elevation={3} sx={{ padding: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Leave Type</InputLabel>
                                <Select
                                    name="leaveTypeId"
                                    value={leaveRequest.leaveTypeId}
                                    onChange={handleInputChange}
                                    label="Leave Type"
                                >
                                    {leaveTypes.map((leaveType) => (
                                        <MenuItem key={leaveType.typeId} value={leaveType.typeId}>
                                            {leaveType.typeName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="startDate"
                                label="Start Date"
                                type="date"
                                value={leaveRequest.startDate}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={startDateError}
                                helperText={startDateError && "Start date must be today or later"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                name="endDate"
                                label="End Date"
                                type="date"
                                value={leaveRequest.endDate}
                                onChange={handleInputChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={endDateError}
                                helperText={endDateError && "End date must be on or after start date"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="reason"
                                label="Reason"
                                multiline
                                rows={4}
                                value={leaveRequest.reason}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-start">
                                <Button variant="contained" color="primary" type="submit">
                                    Add Request
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}

export default AddLeaveRequestUser;
