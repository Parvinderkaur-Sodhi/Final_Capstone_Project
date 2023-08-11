import React, { useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';
import HrService from "../../../services/hr.service";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Card, CardContent, CardActions, CardHeader } from "@mui/material";
import { Delete, Create, AddCircleOutline } from '@mui/icons-material';

function LeaveTypeList(props) {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { user: currentUser } = props;

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

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Card>
        <CardHeader className="title" title="Leave Type List" />
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Allowed Count</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveTypes.map((leaveType) => (
                  <TableRow key={leaveType.typeId}>
                    <TableCell>{leaveType.typeId}</TableCell>
                    <TableCell>{leaveType.typeName}</TableCell>
                    <TableCell>{leaveType.countAllowed}</TableCell>
                    <TableCell>
                      <Link to={`/updateLeaveType/${leaveType.typeId}`}>
                        <Button variant="outlined" startIcon={<Create />}>Edit</Button>
                      </Link>
                      &nbsp;
                      <Button variant="outlined" color="error" startIcon={<Delete />}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <CardActions>
              <Box display="flex" justifyContent="center" width="100%">
                <Link to="/addLeaveTypes">
                  <Button variant="outlined" color="success" startIcon={<AddCircleOutline />}>Add New Leave Type</Button>
                </Link>
              </Box>
            </CardActions>
          </TableContainer>
        </CardContent>
      </Card >
    </div >
  );
}

export default LeaveTypeList;
