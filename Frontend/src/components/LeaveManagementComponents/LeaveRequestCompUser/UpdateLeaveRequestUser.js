import React, { useState, useEffect } from "react";
import { Redirect, useParams, useHistory } from 'react-router-dom';
import { Typography, Paper, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, Card, CardContent, CardHeader } from "@mui/material";
import EmployeeService from "../../../services/employee.service";
import EmployeeNavbar from "../../DashBoardComponents/EmployeeNavbar";
import { toast } from 'react-toastify';

function UpdateLeaveRequestUser(props) {
    const { user: currentUser } = props;
    const { requestId } = useParams();
    const history = useHistory();
    const [leaveBalances, setLeaveBalances] = useState([]);
    const [leaveTypes, setLeaveTypes] = useState([]);
    const [fetchedLeaveRequests, setFetchedLeaveRequests] = useState([]);
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

        EmployeeService.getLeaveRequestById(requestId)
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

    useEffect(() => {
        EmployeeService.getLeaveBalancesByEmpId(localStorage.getItem("employeeId"))
            .then((response) => {
                setLeaveBalances(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        EmployeeService.getLeaveRequestByEmployeeId(localStorage.getItem("employeeId"))
            .then((response) => {
                setFetchedLeaveRequests(response.data);
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

            if (newStartDate <= today) {
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

    const validateDateRange = () => {
        const startDate = new Date(leaveRequest.startDate);
        const endDate = new Date(leaveRequest.endDate);
        const today = new Date();

        setStartDateError(false);
        setEndDateError(false);

        if (startDate <= today) {
            setStartDateError(true);
            return false;
        }

        if (startDate >= endDate) {
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

            // Check for date conflicts with existing leave requests
            const leaveRequestStartDate = new Date(leaveRequest.startDate);
            const leaveRequestEndDate = new Date(leaveRequest.endDate);

            for (const fetchedLeaveRequest of fetchedLeaveRequests) {
                const fetchedStartDate = new Date(fetchedLeaveRequest.startDate);
                const fetchedEndDate = new Date(fetchedLeaveRequest.endDate);

                // Check if the leave request overlaps with an existing request
                if (
                    (leaveRequestStartDate >= fetchedStartDate && leaveRequestStartDate <= fetchedEndDate) ||
                    (leaveRequestEndDate >= fetchedStartDate && leaveRequestEndDate <= fetchedEndDate) ||
                    (fetchedStartDate >= leaveRequestStartDate && fetchedEndDate <= leaveRequestEndDate)
                ) {
                    setLeaveBalanceError("Leave request conflicts with an existing request");
                    return;
                }
            }

            // Proceed with leave request submission
            const requestData = {
                leaveTypeName: { typeId: leaveRequest.leaveTypeId },
                startDate: leaveRequest.startDate,
                endDate: leaveRequest.endDate,
                reason: leaveRequest.reason,
            };

            EmployeeService.updateLeaveRequest(requestId, requestData)
                .then(() => {
                    history.push("/leave-request-user");
                    toast.success("Leave request updated successfully!!");
                })
                .catch((error) => {
                    console.log("Error updating leave request:", error);
                    toast.error("Error updating leave request!!");
                });
        }
    };

    if (!currentUser) {
        return <Redirect to="/login" />;
    }

    return (
        <div>
            <EmployeeNavbar />
            <Card style={{ padding: "10px", paddingBottom: "60px" }}>
                <CardContent>
                    <CardHeader className="title" title="Update Leave Request" />
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
                                <br></br>
                                <Box display="flex" justifyContent="center">
                                    <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: '#98144d', color: "white" }}>
                                        Update Request
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

export default UpdateLeaveRequestUser;
