import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import { Typography, Paper, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Card, CardContent, CardHeader, Alert } from "@mui/material";
import EmployeeService from "../../../services/employee.service";
import EmployeeNavbar from "../../DashBoardComponents/EmployeeNavbar";

function AddLeaveRequestUser(props) {
    const { user: currentUser } = props;
    const history = useHistory();
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [leaveBalances, setLeaveBalances] = useState([]);
    const [leaveRequest, setLeaveRequest] = useState({
        leaveTypeId: "",
        startDate: "",
        endDate: "",
        reason: "",
    });
    const [startDateError, setStartDateError] = useState(false);
    const [endDateError, setEndDateError] = useState(false);
    const [leaveBalanceError, setLeaveBalanceError] = useState("");

    const calculateDateDifference = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const timeDiff = Math.abs(end - start);
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    };

    useEffect(() => {
        EmployeeService.getAllLeaveTypes()
            .then((response) => {
                setLeaveTypes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentUser]);

    useEffect(() => {
        EmployeeService.getLeaveBalancesByEmpId(localStorage.getItem("employeeId"))
            .then((response) => {
                setLeaveBalances(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
      
        if (name === "startDate") {
          const today = new Date();
          const newStartDate = new Date(value);
      
          today.setHours(0, 0, 0, 0);
          newStartDate.setHours(0, 0, 0, 0);
      
          if (newStartDate < today) {
            setStartDateError(true);
          } else {
            setStartDateError(false);
          }
        } else if (name === "endDate") {
          const newEndDate = new Date(value);
          const startDate = new Date(leaveRequest.startDate);
      
          startDate.setHours(0, 0, 0, 0);
          newEndDate.setHours(0, 0, 0, 0);
      
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

        // Validate leave balance
        const requestedDuration = calculateDateDifference(leaveRequest.startDate, leaveRequest.endDate);
        const selectedLeaveType = leaveTypes.find(type => type.typeId === leaveRequest.leaveTypeId);
        console.log("leaveTypes:", selectedLeaveType);

        if (selectedLeaveType) {
            const leaveBalance = leaveBalances.find(balance => balance.leaveType.typeId === selectedLeaveType.typeId);

            if (leaveBalance) {
                if (requestedDuration > leaveBalance.balance) {
                    setLeaveBalanceError("Not enough leave balance for the requested leave");
                    return;
                } else {
                    setLeaveBalanceError("");
                }
            } else {
                // Check allowed leave count from leave types
                if (requestedDuration > selectedLeaveType.countAllowed) {
                    setLeaveBalanceError("Not enough allowed leave count for the requested leave");
                    return;
                } else {
                    setLeaveBalanceError("");
                }
            }


            // Proceed with leave request submission
            const requestData = {
                employeeId: {
                    employeeId: localStorage.getItem("employeeId")
                },
                leaveTypeName: { typeId: leaveRequest.leaveTypeId },
                startDate: leaveRequest.startDate,
                endDate: leaveRequest.endDate,
                reason: leaveRequest.reason,
            };

            EmployeeService.saveLeaveRequest(requestData)
                .then(() => {
                    alert("Leave request submitted successfully!!");
                    history.push("/leave-request-user");
                })
                .catch((error) => {
                    console.log("Error adding leave request:", error);
                });
        }
    };


    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <EmployeeNavbar />
            <Card style={{ padding: "10px", paddingBottom: "60px"}}>
                <CardContent>
                    <CardHeader className="title" title="Add Leave Request" />
                    <br></br>
                    {/* <Paper elevation={3} sx={{ padding: 2 }}> */}
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
                                    {leaveBalanceError && (
                                        <Box color="error.main">{leaveBalanceError}</Box>
                                    )}
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
                                    <br></br>
                                    <Box display="flex" justifyContent="center">
                                        <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: '#98144d', color: "white" }}>
                                            Add Request
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    {/* </Paper> */}
                </CardContent>
            </Card>
        </div>
    );
}

export default AddLeaveRequestUser;
