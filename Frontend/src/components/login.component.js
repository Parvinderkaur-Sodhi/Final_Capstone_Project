import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Container, Typography, TextField, Button, CircularProgress, Snackbar, Card, Grid} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const required = (value) => {
  if (!value) {
    return "This field is required!";
  }
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StyledContainer = styled(Container)({
  display: "flex",
  marginTop: "25px",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "70vh",
  boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
});


class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      password: "",
      loading: false,
      snackbarOpen: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const { dispatch, history } = this.props;

    dispatch(login(this.state.username, this.state.password))
      .then(() => {
        if (this.state.username === "Admin" && this.state.email === "admin@gmail.com") {
          history.push("/admin-dashboard");
        } else {
          history.push("/profile");
        }
        window.location.reload();
      })
      .catch(() => {
        this.setState({
          loading: false,
          snackbarOpen: true,
        });
      });
  }

  handleSnackbarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  render() {
    const { isLoggedIn, message } = this.props;

    if (isLoggedIn) {
      return <Redirect to={this.state.username === "Admin" && this.state.email === "admin@gmail.com" ? "/admin-dashboard" : "/profile"} />;
    }

    return (
      <div>
        <Grid container >
          <Grid item xs={12} md={6}>
            <StyledContainer>
              <div>
                <Typography variant="h4" align="center">
                  Login <LockOpenIcon color="default" fontSize="large" />
                </Typography>
                <br></br>
                <form onSubmit={this.handleLogin}>
                  <TextField
                    variant="outlined"
                    margin="dense"
                    required
                    fullWidth
                    label="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    error={message}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    error={message}
                  />

                  <br></br>
                  <br></br>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: 'black', color: 'white' }}
                    disabled={this.state.loading}
                  >
                    {this.state.loading ? <CircularProgress size={24} /> : "Login"}
                  </Button>
                </form>

                <Snackbar
                  open={this.state.snackbarOpen}
                  autoHideDuration={6000}
                  onClose={this.handleSnackbarClose}
                >
                  <Alert onClose={this.handleSnackbarClose} severity="error">
                    {message}
                  </Alert>
                </Snackbar>
              </div>
            </StyledContainer>
          </Grid>
          <Grid item xs={12} md={6} style={{ backgroundImage: 'url("/bg.png")', backgroundSize: 'cover' }}></Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);
