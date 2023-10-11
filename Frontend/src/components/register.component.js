// import React, { Component } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";
// import { Typography, TextField, Button, CircularProgress, Snackbar, Card, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import Alert from '@mui/material/Alert';
// import { styled } from '@mui/material/styles';

// import { connect } from "react-redux";
// import { register } from "../actions/auth";
// import HrNavbar from "./DashBoardComponents/HrNavbar";

// const required = (value) => {
//   if (!value) {
//     return "This field is required!";
//   }
// };

// const email = (value) => {
//   if (!isEmail(value)) {
//     return "This is not a valid email.";
//   } else if (!value.endsWith(".com") && !value.endsWith(".in")) {
//     return "Email domains must be either .com or .in.";
//   }
// };

// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return "The username must be between 3 and 20 characters.";
//   }
// };

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return "The password must be between 6 and 40 characters.";
//   }
// };

// // validateFields = () => {
// //   const errors = {};
// //   // Validate 'username' field
// //   if (this.state.username.length < 3 || this.state.username.length > 20) {
// //     errors.username = "The username must be between 3 and 20 characters.";
// //   }
// //   // Validate 'email' field
// //   if (!isEmail(this.state.email)) {
// //     errors.email = "This is not a valid email.";
// //   } else if (!this.state.email.endsWith(".com") && !this.state.email.endsWith(".in")) {
// //     errors.email = "Email domains must be either .com or .in.";
// //   }
// //   // Validate 'password' field
// //   if (this.state.password.length < 6 || this.state.password.length > 40) {
// //     errors.password = "The password must be between 6 and 40 characters.";
// //   }
// //   // Update the 'errors' state
// //   this.setState({ errors });
// // };

// // // Add a 'useEffect' to validate fields on change
// // useEffect(() => {
// //   this.validateFields();
// // }, [this.state.username, this.state.email, this.state.password]);


// const StyledCard = styled(Card)(({ theme }) => ({
//   margin: "auto",
//   marginTop: theme.spacing(8),
//   padding: theme.spacing(4),
//   textAlign: "center",
//   boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
// }));

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.handleRegister = this.handleRegister.bind(this);
//     this.onChangeRole = this.onChangeRole.bind(this);
//     this.onChangeUsername = this.onChangeUsername.bind(this);
//     this.onChangeEmail = this.onChangeEmail.bind(this);
//     this.onChangePassword = this.onChangePassword.bind(this);

//     this.state = {
//       role: "",
//       username: "",
//       email: "",
//       password: "",
//       successful: false,
//       emailError: "",
//     };
//   }

//   onChangeRole(e) {
//     this.setState({
//       role: e.target.value,
//     });
//   }


//   onChangeUsername(e) {
//     this.setState({
//       username: e.target.value,
//     });
//   }

//   onChangeEmail(e) {
//     this.setState({
//       emailError: "",
//       email: e.target.value,
//     });
//   }

//   onChangePassword(e) {
//     this.setState({
//       password: e.target.value,
//     });
//   }

//   handleRegister(e) {
//     e.preventDefault();

//     this.setState({
//       successful: false,
//     });

//     this.form.validateAll();

//     if (this.checkBtn.context._errors.length === 0) {
//       this.props
//         .dispatch(
//           register(this.state.role, this.state.username, this.state.email, this.state.password)
//         )
//         .then(() => {
//           this.setState({
//             successful: true,
//           });
//         })
//         .catch(() => {
//           this.setState({
//             successful: false,
//           });
//         });
//     }
//   }

//   render() {
//     const { message } = this.props;
//     const { emailError } = this.state;

//     return (
//       <div>
//         <HrNavbar />
//         <StyledCard>
//           <Typography variant="h4" align="center">
//             User Registration <PersonAddIcon color="default" fontSize="large" />
//           </Typography>

//           <br></br>

//           <Form
//             onSubmit={this.handleRegister}
//             ref={(c) => {
//               this.form = c;
//             }}
//           >
//             {!this.state.successful && (
//               <div>
//                 <FormControl required variant="outlined" margin="dense">
//                   <InputLabel>Role</InputLabel>
//                   <Select
//                     name="role"
//                     style={{ width: '400px' }}
//                     onChange={(e) => {
//                       this.onChangeRole(e);
//                       this.setState({ role: e.target.value });
//                     }}
//                     value={this.state.role}
//                     label="Role"
//                   >
//                     <MenuItem value="">Select Role</MenuItem>
//                     <MenuItem value="Admin">Admin</MenuItem>
//                     {/* <MenuItem value="Manager">Manager</MenuItem> */}
//                     <MenuItem value="Employee">Employee</MenuItem>
//                   </Select>
//                 </FormControl>

//                 <br></br>

//                 <TextField
//                   variant="outlined"
//                   margin="normal"
//                   style={{ width: '400px' }}
//                   required
//                   label="Username"
//                   name="username"
//                   value={this.state.username}
//                   onChange={this.onChangeUsername}
//                   // error={message}
//                   error={!!message.username} // Check if there is an error message for username
//                   helperText={message.username}
//                   validations={[required, vusername]}
//                 />

//                 <br></br>

//                 <div>
//                   <TextField
//                     variant="outlined"
//                     style={{ width: '400px' }}
//                     margin="normal"
//                     required
//                     label="Email"
//                     name="email"
//                     value={this.state.email}
//                     onChange={this.onChangeEmail}
//                     // error={!!message.email} // Check if there is an error message for username
//                     error={!!message.email || !!emailError} // Check if there is an error message for username or emailError is not empty
//                     helperText={message.email || emailError}
//                     validations={[required, email]}
//                   />
//                   {emailError && (
//                     <div className="alert alert-danger" role="alert">
//                       {emailError}
//                     </div>
//                   )}
//                 </div>

//                 <TextField
//                   variant="outlined"
//                   style={{ width: '400px' }}
//                   margin="normal"
//                   required
//                   label="Password"
//                   type="password"
//                   name="password"
//                   value={this.state.password}
//                   onChange={this.onChangePassword}
//                   error={!!message.password} // Check if there is an error message for username
//                   helperText={message.password}
//                   validations={[required, vpassword]}
//                 />

//                 <br></br>

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   style={{ backgroundColor: '#98144d', color: "white", marginTop: "16px", width: '400px' }}
//                   disabled={this.state.loading}
//                 >
//                   {this.state.loading ? <CircularProgress size={24} /> : "Sign Up"}
//                 </Button>
//               </div>
//             )}

//             {message && (
//               <div style={{ marginTop: "16px" }}>
//                 <Alert severity={this.state.successful ? "success" : "error"}>
//                   {message}
//                 </Alert>
//                 {this.state.successful && (
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     style={{ backgroundColor: '#98144d', color: "white", marginTop: "16px" }}
//                     onClick={() => {
//                       this.props.history.push("/employee-list");
//                     }}
//                   >
//                     Go to Employee List
//                   </Button>
//                 )}
//               </div>
//             )}
//             <CheckButton
//               style={{ display: "none" }}
//               ref={(c) => {
//                 this.checkBtn = c;
//               }}
//             />
//           </Form>
//         </StyledCard>

//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   const { message } = state.message;
//   return {
//     message,
//   };
// }

// export default connect(mapStateToProps)(Register);


import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Typography, TextField, Button, CircularProgress, Snackbar, Card, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
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
  } else if (!value.endsWith(".com") && !value.endsWith(".in")) {
    return "Email domains must be either .com or .in.";
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
      emailError: "",
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
    const emailValue = e.target.value;
    this.setState({
      emailError: "",
      email: emailValue,
    });

    if (!isEmail(emailValue)) {
      this.setState({
        emailError: "This is not a valid email.",
      });
    } else if (!emailValue.endsWith(".com") && !emailValue.endsWith(".in")) {
      this.setState({
        emailError: "Email domains must be either .com or .in.",
      });
    }
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
        <HrNavbar />
        <StyledCard>
          <Typography variant="h4" align="center">
            User Registration <PersonAddIcon color="default" fontSize="large" />
          </Typography>

          <br></br>

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <FormControl required variant="outlined" margin="dense">
                  <InputLabel>Role</InputLabel>
                  <Select
                    name="role"
                    style={{ width: '400px' }}
                    onChange={(e) => {
                      this.onChangeRole(e);
                      this.setState({ role: e.target.value });
                    }}
                    value={this.state.role}
                    label="Role"
                  >
                    <MenuItem value="">Select Role</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                    <MenuItem value="Employee">Employee</MenuItem>
                  </Select>
                </FormControl>

                <br></br>

                <TextField
                  variant="outlined"
                  margin="normal"
                  style={{ width: '400px' }}
                  required
                  label="Username"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChangeUsername}
                  error={!!message.username}
                  helperText={message.username}
                  validations={[required, vusername]}
                />

                <br></br>

                <div>
                  <TextField
                    variant="outlined"
                    style={{ width: '400px' }}
                    margin="normal"
                    required
                    label="Email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    error={!!message.email || !!this.state.emailError}
                    helperText={message.email || this.state.emailError}
                    validations={[required, email]}
                  />
                </div>

                <TextField
                  variant="outlined"
                  style={{ width: '400px' }}
                  margin="normal"
                  required
                  label="Password"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChangePassword}
                  error={!!message.password}
                  helperText={message.password}
                  validations={[required, vpassword]}
                />

                <br></br>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: '#98144d', color: "white", marginTop: "16px", width: '400px' }}
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
