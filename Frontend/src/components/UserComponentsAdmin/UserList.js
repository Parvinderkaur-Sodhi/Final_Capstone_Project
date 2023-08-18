import React, { useState, useEffect } from "react";
import HrService from "../../services/hr.service";
import { Redirect } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = props;

  useEffect(() => {
    HrService.getAllUsers()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
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
      <h2>User List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserList;
