import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { Typography, Paper, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import employeeService from "../../../services/employee.service";

function UpdateLeaveRequestUser(props) {
    const { user: currentUser } = props;
    const { requestId } = useParams();
    const history = useHistory(); // Initialize history
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

        employeeService.getLeaveRequestById(requestId)
            .then((response) => {
                const { leaveTypeName, startDate, endDate, reason } = response.data;

                // Convert the date strings to "YYYY-MM-DD" format
                const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
                const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

                setLeaveRequest({
                    leaveTypeId: leaveTypeName.typeId,
                    startDate: formattedStartDate,
                    endDate: formattedEndDate,
                    reason,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [requestId]);

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

            if (leaveRequest.endDate) {
                const newEndDate = new Date(leaveRequest.endDate);
                if (newEndDate < newStartDate) {
                    setEndDateError(true);
                } else {
                    setEndDateError(false);
                }
            }
        } else if (name === "endDate") {
            const newEndDate = new Date(value);
            const startDate = new Date(leaveRequest.startDate);

            if (newEndDate <= startDate) {
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

    const validateDateRange = () => {
        const startDate = new Date(leaveRequest.startDate);
        const endDate = new Date(leaveRequest.endDate);
        const today = new Date();

        setStartDateError(false);
        setEndDateError(false);

        if (startDate < today) {
            setStartDateError(true);
            return false;
        }

        if (startDate > endDate) {
            setStartDateError(true);
            setEndDateError(true);
            return false;
        }

        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateDateRange()) {
            return;
        }

        const requestData = {
            leaveTypeName: { typeId: leaveRequest.leaveTypeId },
            startDate: leaveRequest.startDate,
            endDate: leaveRequest.endDate,
            reason: leaveRequest.reason,
        };

        employeeService.updateLeaveRequest(requestId, requestData)
            .then(() => {
                console.log("Leave request updated successfully");
                history.push("/leave-request-user");
            })
            .catch((error) => {
                console.log("Error updating leave request:", error);
            });
    };

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Update Leave Request
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
                                helperText={endDateError && "End date must be today or later than Start Date"}
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
                                    Update Request
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}

export default UpdateLeaveRequestUser;
