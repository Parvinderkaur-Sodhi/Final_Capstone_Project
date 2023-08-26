import React, { useState, useEffect } from "react";
import UserService from "../../services/user.service";
import { Redirect } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, CardHeader } from "@mui/material";
import HrNavbar from "../DashBoardComponents/HrNavbar";

function UserList(props) {
  const [users, setUsers] = useState([]);
  const { user: currentUser } = props;

  useEffect(() => {
    UserService.getAllUsers()
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          <CardHeader className="title" title="Users List"/>
          <div style={{ maxHeight: "84vh", overflowY: "auto", paddingRight: "17px" }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow style={Styles}>
                    <TableCell>ID</TableCell>
                    <TableCell>Username</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default UserList;
