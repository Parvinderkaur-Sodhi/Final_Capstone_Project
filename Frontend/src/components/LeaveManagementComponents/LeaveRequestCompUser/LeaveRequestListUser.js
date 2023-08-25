import React, { useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';
import {
  Typography, Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button,
  Card, CardContent, CardActions, Box, Dialog, DialogTitle, DialogContent, DialogActions
  , FormControl, Select, InputLabel, Grid, MenuItem, IconButton, CardHeader
} from "@mui/material";
import { AddCircleOutline, Create, Delete, ViewList, CalendarToday } from '@mui/icons-material';
import CalendarView from "../../CalenderView";
import EmployeeService from "../../../services/employee.service";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EmployeeNavbar from "../../DashBoardComponents/EmployeeNavbar";
import Pagination from '@mui/material/Pagination';

function LeaveRequestListUser(props) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [calendarView, setCalendarView] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const leaveRequestsPerPage = 4;

  const employeeId = localStorage.getItem("employeeId");
  const { user: currentUser } = props;

  useEffect(() => {
    if (employeeId) {
      EmployeeService.getLeaveRequestByEmployeeId(employeeId)
        .then((response) => {
          setLeaveRequests(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    EmployeeService.getAllLeaveTypes()
      .then((response) => {
        setLeaveTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, [employeeId]);

  const handleDeleteClick = (requestId) => {
    setSelectedRequestId(requestId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRequestId) {
      EmployeeService.deleteLeaveRequest(selectedRequestId)
        .then(() => {
          setLeaveRequests(leaveRequests.filter((request) => request.requestId !== selectedRequestId));
          setSelectedRequestId(null);
          setDeleteDialogOpen(false);
        })
        .catch((error) => {
          console.log("Error deleting leave request:", error);
        });
    }
  };

  const handleDeleteCancel = () => {
    setSelectedRequestId(null);
    setDeleteDialogOpen(false);
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

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastLeaveRequest = currentPage * leaveRequestsPerPage;
  const indexOfFirstLeaveRequest = indexOfLastLeaveRequest - leaveRequestsPerPage;
  const currentLeaveRequests = filteredLeaveRequests.slice(indexOfFirstLeaveRequest, indexOfLastLeaveRequest);


  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <EmployeeNavbar />
      <Card style={{ height: "80vh", overflowY: "auto", paddingRight: "17px" }}>
        <CardContent>
          <CardHeader className="title" title="Leaves" />
          <Grid container spacing={2} alignItems="center">
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
            <Grid item xs={4}>
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
            </Grid>
          </Grid>

          <br></br>

          {calendarView ? (
            <CalendarView leaveRequests={filteredLeaveRequests} />
          ) : (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Leave Type</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell style={{ width: "24%" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {currentLeaveRequests.map((request) => (
                    <TableRow key={request.requestId}>
                      <TableCell>{request.requestId}</TableCell>
                      <TableCell>{request.leaveTypeName.typeName}</TableCell>
                      <TableCell>{new Date(request.startDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(request.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>
                        {request.status === "Pending" && (
                          <React.Fragment>
                            <Link to={`/update-leave-request/${request.requestId}`}>
                              <Button variant="outlined" startIcon={<Create />}>Edit</Button>
                            </Link>
                            &nbsp;&nbsp;
                            <Link to={`/leave-request-user`}>
                              <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDeleteClick(request.requestId)}>Delete</Button>
                            </Link>
                          </React.Fragment>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
        <CardActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Link to="/add-leave-request">
              <Button variant="outlined" color="success" style={{ backgroundColor: '#98144d', color: "white" }} startIcon={<AddCircleOutline />}>Add New Leave Request</Button>
            </Link>
            <Pagination
              count={Math.ceil(filteredLeaveRequests.length / leaveRequestsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              boundaryCount={1} // Show only the first and last pages
              siblingCount={0} // Hide siblings (previous and next)
            />
          </Box>
        </CardActions>

        <Dialog open={deleteDialogOpen}>
          <DialogTitle>Delete Leave Request</DialogTitle>
          <DialogContent>
            Are you sure you want to delete the leave request?
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
      </Card>
    </div>
  );
}

export default LeaveRequestListUser;
