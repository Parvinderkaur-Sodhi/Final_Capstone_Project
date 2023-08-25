import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom';
import HrService from "../../../services/hr.service";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
  FormControl, Select, InputLabel, TextField, Grid, MenuItem, Card, CardContent, Typography,
  Box, IconButton, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText, CardHeader, CardActions
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import CalendarView from "../../CalenderView";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Pagination from '@mui/material/Pagination';
import HrNavbar from "../../DashBoardComponents/HrNavbar";
import { Style } from "@mui/icons-material";

function LeaveRequestList(props) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [calendarView, setCalendarView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Added state for pagination
  const leaveRequestsPerPage = 2;

  const { user: currentUser } = props;

  useEffect(() => {
    HrService.getAllLeaveRequests()
      .then((response) => {
        setLeaveRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    HrService.getAllLeaveTypes()
      .then((response) => {
        setLeaveTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAccept = (requestId) => {
    setSelectedRequestId(requestId);
    setSelectedStatus("Accepted");
    setConfirmationOpen(true);
  };

  const handleReject = (requestId) => {
    setSelectedRequestId(requestId);
    setSelectedStatus("Rejected");
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setSelectedRequestId(null);
    setSelectedStatus("");
  };

  const handleConfirmAction = () => {
    HrService.setStatusLeaveRequest(selectedRequestId, { status: selectedStatus })
      .then(() => {
        const updatedLeaveRequests = leaveRequests.map((leaveRequest) => {
          if (leaveRequest.requestId === selectedRequestId) {
            return { ...leaveRequest, status: selectedStatus };
          }
          return leaveRequest;
        });

        setLeaveRequests(updatedLeaveRequests);
        setConfirmationOpen(false);
        setSelectedRequestId(null);
        setSelectedStatus("");
      })
      .catch((error) => {
        console.log("Error updating leave request status:", error);
      });
  };


  const filteredLeaveRequests = leaveRequests.filter((leaveRequest) => {
    const statusMatches = filterStatus === "" || leaveRequest.status === filterStatus;
    const typeMatches = filterType === "" || leaveRequest.leaveTypeName.typeName === filterType;

    return (
      statusMatches &&
      typeMatches &&
      (leaveRequest.employeeId.fname.toLowerCase().includes(filterText.toLowerCase()) ||
        leaveRequest.leaveTypeName.typeName.toLowerCase().includes(filterText.toLowerCase()) ||
        leaveRequest.status.toLowerCase().includes(filterText.toLowerCase()))
    );
  });

  // Calculate pagination
  const indexOfLastRequest = currentPage * leaveRequestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - leaveRequestsPerPage;
  const currentLeaveRequests = filteredLeaveRequests.slice(indexOfFirstRequest, indexOfLastRequest);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const Styles = {
    color: 'black',
    backgroundColor: "lightgrey", 
    fontWeight: "bold",
  };


  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <HrNavbar />
      <Card>
        <CardContent>
          <div style={{ maxHeight: "84vh", overflowY: "auto", paddingRight: "17px" }}>
            <CardHeader className="title" title="All Leaves" />
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <TextField
                  label="Search"
                  variant="outlined"
                  fullWidth
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Accepted">Accepted</MenuItem>
                    <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl variant="outlined" fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    label="Type"
                  >
                    <MenuItem value="">All</MenuItem>
                    {leaveTypes.map((type) => (
                      <MenuItem key={type.id} value={type.typeName}>
                        {type.typeName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              marginTop={1}
            >

              <IconButton
                color="primary"
                aria-label="toggle-view"
                onClick={() => setCalendarView(!calendarView)}
              >
                {calendarView ? (
                  <>
                    <ViewListIcon /> &nbsp;
                    <Typography variant="body2">List View</Typography>
                  </>
                ) : (
                  <>
                    <CalendarTodayIcon /> &nbsp;
                    <Typography variant="body2">Calendar View</Typography>
                  </>
                )}
              </IconButton>
            </Box>
            <br></br>

            {calendarView ? (
              <CalendarView leaveRequests={filteredLeaveRequests} />
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead style={Styles}>
                    <TableRow>
                      <TableCell style={{ width: "5%" }}>ID</TableCell>
                      <TableCell style={{ width: "15%" }}>Employee Name</TableCell>
                      <TableCell style={{ width: "15%" }}>Leave Type</TableCell>
                      <TableCell style={{ width: "10%" }} >Start Date</TableCell>
                      <TableCell style={{ width: "10%" }} >End Date</TableCell>
                      <TableCell style={{ width: "auto" }} >Reason</TableCell>
                      <TableCell style={{ width: "5%" }} >Status</TableCell>
                      <TableCell style={{ width: "10%" }} >Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentLeaveRequests.map((leaveRequest) => (
                      <TableRow key={leaveRequest.requestId}>
                        <TableCell>{leaveRequest.requestId}</TableCell>
                        <TableCell>{leaveRequest.employeeId.fname}</TableCell>
                        <TableCell>{leaveRequest.leaveTypeName.typeName}</TableCell>
                        <TableCell>{new Date(leaveRequest.startDate).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(leaveRequest.endDate).toLocaleDateString()}</TableCell>
                        <TableCell>{leaveRequest.reason}</TableCell>
                        <TableCell>{leaveRequest.status}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="success"
                            startIcon={<CheckIcon />}
                            onClick={() => handleAccept(leaveRequest.requestId)}
                            disabled={leaveRequest.status !== "Pending"}
                            style={{ marginBottom: "10px" }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="outlined"
                            color="error"
                            startIcon={<ClearIcon />}
                            onClick={() => handleReject(leaveRequest.requestId)}
                            disabled={leaveRequest.status !== "Pending"}
                          >
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            <CardActions>
              <Grid container>
                <Grid item xs={12} md={6}>
                  {/* Content for the first Grid item */}
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container justifyContent="flex-end" marginTop="10px">
                    <Pagination
                      count={Math.ceil(filteredLeaveRequests.length / leaveRequestsPerPage)}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      boundaryCount={1} // Show only the first and last page buttons
                      siblingCount={0}  // Show only previous and next buttons
                    />
                  </Grid>
                </Grid>
              </Grid>
            </CardActions>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={confirmationOpen}
        onClose={handleConfirmationClose}
      >
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {selectedStatus.toLowerCase()} this leave request?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default LeaveRequestList;
