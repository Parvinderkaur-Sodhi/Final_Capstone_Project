import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import HrService from "../../../services/hr.service";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardHeader,
  CardContent,
  Box,
} from "@mui/material";
import EmployeeNavbar from "../../DashBoardComponents/EmployeeNavbar";
import Pagination from '@mui/material/Pagination';

function LeaveTypeListUser(props) {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const { user: currentUser } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      <EmployeeNavbar />
      <Card>
        <div style={{ maxHeight: "80vh", overflowY: "auto", paddingRight: "17px" }}>
          <CardContent>
            <CardHeader className="title" title="Leave Type List" />
            <TableContainer component={Paper} style={{ width: "80%", padding: "40px", margin: "auto" }}>
              <Table>
                <TableHead>
                  <TableRow style = {Styles}>
                    <TableCell style={{ width: "50%" }}>Name</TableCell>
                    <TableCell style={{ width: "50%" }}>Allowed Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaveTypes.slice((currentPage - 1) * leaveTypesPerPage, currentPage * leaveTypesPerPage).map((leaveType) => (
                    <TableRow key={leaveType.typeId}>
                      <TableCell>{leaveType.typeName}</TableCell>
                      <TableCell>{leaveType.countAllowed}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%" padding={2}>
              <Pagination
                count={Math.ceil(leaveTypes.length / leaveTypesPerPage)}
                page={currentPage}
                onChange={(event, value) => setCurrentPage(value)}
                color="primary"
              />
            </Box>
          </CardContent>
        </div>
      </Card>
    </div >
  );
}

export default LeaveTypeListUser;
