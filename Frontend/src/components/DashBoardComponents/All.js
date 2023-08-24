import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton,
    CircularProgress,
    Box,
    Divider,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HrService from "../../services/hr.service";
import SmallCalendar from "../DashBoardComponents/SmallCalendar";
import Navbar from "./HrNavbar";

function All(props) {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [attendancePercentage, setAttendancePercentage] = useState(85); // Sample data
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const notificationStyle = {
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: "#f0f0f0",
        padding: "10px",
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
    };

    const handleNotificationOpen = () => {
        setNotificationOpen(true);
    };

    return (
        <div>
            <Navbar />
            {/* Sidebar */}
            <div
                className={`sidebar ${sidebarOpen ? "open" : ""}`}
                style={{
                    zIndex: 0,
                    width: "200px",
                    height: "100vh",
                    position: "fixed",
                    top: 0,
                    left: sidebarOpen ? 0 : "-200px",
                    backgroundColor: "#333",
                    color: "#fff",
                    transition: "0.3s",
                }}
            >
                {/* Sidebar content */}
            </div>

            <div className={`main-content ${sidebarOpen ? "shift-right" : ""}`}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-end"
                    p={2}
                    zIndex={100}
                >
                    <IconButton
                        color="primary"
                        aria-label="notification"
                        onClick={handleNotificationOpen}
                    >
                        <NotificationsIcon />
                    </IconButton>
                </Box>
                <Divider />

                {/* Notification Content */}
                {notificationOpen && (
                    <Box p={2} bgcolor="lightgrey" zIndex={99}>
                        This is a sample notification.
                    </Box>
                )}
                <Divider />
                <Card>
                    <Grid container spacing={4}>
                        {/* Small Calendar */}
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Calendar
                                    </Typography>
                                    <SmallCalendar leaveRequests={leaveRequests} />
                                </CardContent>
                            </Card>
                        </Grid>
                        {/* Attendance */}
                        <Grid item xs={6}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        Attendance
                                    </Typography>
                                    <Box
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        <CircularProgress
                                            variant="determinate"
                                            value={attendancePercentage}
                                            size={100}
                                            thickness={6}
                                        />
                                        &nbsp;&nbsp;
                                        <Typography variant="h6" gutterBottom>
                                            {attendancePercentage}% Attendance
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Card>

            </div>
        </div>
    );
}

export default All;
