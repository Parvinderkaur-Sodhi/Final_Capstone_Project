// LeaveTypeList.js
import React, { useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';
import HrService from "../../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Card, CardContent, CardActions, CardHeader, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Delete, Create, AddCircleOutline } from '@mui/icons-material';
import HrNavbar from "../../DashBoardComponents/HrNavbar";
import Pagination from '@mui/material/Pagination';

function LeaveTypeList(props) {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { user: currentUser } = props;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const leaveTypesPerPage = 5;

  useEffect(() => {
    HrService.getAllLeaveTypes()
      .then((response) => {
        console.log(response);
        setLeaveTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDeleteClick = (leaveType) => {
    setSelectedLeaveType(leaveType);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedLeaveType) {
      HrService.deleteLeaveType(selectedLeaveType.typeId)
        .then(() => {
          // Filter out the deleted leave type from the list
          setLeaveTypes(leaveTypes.filter((lt) => lt.typeId !== selectedLeaveType.typeId));
          setSelectedLeaveType(null);
          setDeleteDialogOpen(false);
        })
        .catch((error) => {
          console.log("Error deleting leave type:", error);
        });
    }
  };

  const handleDeleteCancel = () => {
    setSelectedLeaveType(null);
    setDeleteDialogOpen(false);
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
      <Card style={{ height: "80vh", overflowY: "auto", paddingRight: "17px" }}>
        <CardHeader className="title" title="Leave Type List" />
        <CardContent>
          <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow style = {Styles}> 
                  <TableCell style={{ width: "10%" }}>ID</TableCell>
                  <TableCell style={{ width: "30%" }}>Name</TableCell>
                  <TableCell style={{ width: "20%" }}>Allowed Count</TableCell>
                  <TableCell style={{ width: "30%" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {leaveTypes.slice((currentPage - 1) * leaveTypesPerPage, currentPage * leaveTypesPerPage).map((leaveType) => (
                  <TableRow key={leaveType.typeId}>
                    <TableCell>{leaveType.typeId}</TableCell>
                    <TableCell>{leaveType.typeName}</TableCell>
                    <TableCell>{leaveType.countAllowed}</TableCell>
                    <TableCell>
                      <Link to={`/updateLeaveType/${leaveType.typeId}`}>
                        <Button variant="outlined" startIcon={<Create />}>Edit</Button>
                      </Link>
                      &nbsp;
                      <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => handleDeleteClick(leaveType)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
              ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <CardActions>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
              <Link to="/addLeaveTypes">
                <Button variant="outlined" color="success" style={{ backgroundColor: '#98144d', color: "white" }} startIcon={<AddCircleOutline />}>Add New Leave Type</Button>
              </Link>
              <Pagination
                count={Math.ceil(leaveTypes.length / leaveTypesPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </CardActions>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen}>
        <DialogTitle>Delete Leave Type</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the leave type?
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
    </div>
  );
}

export default LeaveTypeList;
