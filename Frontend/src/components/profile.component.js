import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { Card, CardContent, Typography, Grid, Link, TextField, Box } from "@mui/material";
import { FaDribbble, FaTwitter, FaLinkedin, FaFacebook, FaMailBulk } from 'react-icons/fa';

class Profile extends Component {
  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <Card variant="outlined" sx={{ margin: "20px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                fullWidth
                disabled
                value={currentUser.username}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="ID"
                fullWidth
                disabled
                value={currentUser.id}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                fullWidth
                disabled
                value={currentUser.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                fullWidth
                disabled
                type="password"
                value="********"
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Box display="flex" alignItems="center" gap={4}>
                <Link href="#"><FaDribbble size={24} /></Link>
                <Link href="#"><FaTwitter size={24} /></Link>
                <Link href="#"><FaLinkedin size={24} /></Link>
                <Link href="#"><FaFacebook size={24} /></Link>
                <Link href="#"><FaMailBulk size={24} /></Link>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
