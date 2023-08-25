import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Container, Typography, TextField, Button, CircularProgress, Snackbar, Card, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

import { connect } from "react-redux";
import { register } from "../actions/auth";
import HrNavbar from "./DashBoardComponents/HrNavbar";

const required = (value) => {
  if (!value) {
    return "This field is required!";
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return "This is not a valid email.";
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return "The username must be between 3 and 20 characters.";
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return "The password must be between 6 and 40 characters.";
  }
};

const StyledCard = styled(Card)(({ theme }) => ({
  margin: "auto",
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  textAlign: "center",
  boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
}));

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeRole = this.onChangeRole.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      role: "",
      username: "",
      email: "",
      password: "",
      successful: false,
    };
  }

  onChangeRole(e) {
    this.setState({
      role: e.target.value,
    });
  }


  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          register(this.state.role, this.state.username, this.state.email, this.state.password)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (

      <div>

        <HrNavbar/>

        <StyledCard>
          <Typography variant="h4" align="center">
            User Registration <PersonAddIcon color="default" fontSize="large" />
          </Typography>

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <FormControl required variant="outlined" fullWidth margin="dense">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    onChange={(e) => {
                      this.onChangeRole(e);
                      this.setState({ role: e.target.value });
                    }}
                    value={this.state.role}
                    label="Role"
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                  </Select>
                </FormControl>

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  error={message}
                  validations={[required, vusername]}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  error={message}
                  validations={[required, email]}
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
                  validations={[required, vpassword]}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#98144d', color: "white", marginTop: "16px" }}
                  disabled={this.state.loading}
                >
                  {this.state.loading ? <CircularProgress size={24} /> : "Sign Up"}
                </Button>
              </div>
            )}

            {message && (
              <div style={{ marginTop: "16px" }}>
                <Alert severity={this.state.successful ? "success" : "error"}>
                  {message}
                </Alert>
                {this.state.successful && (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: '#98144d', color: "white", marginTop: "16px" }}
                    onClick={() => {
                      this.props.history.push("/employee-list");
                    }}
                  >
                    Go to Employee List
                  </Button>
                )}
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </StyledCard>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const { message } = state.message;
  return {
    message,
  };
}

export default connect(mapStateToProps)(Register);
