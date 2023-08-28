import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import User from "./components/user.component";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";
import { history } from './helpers/history';
import EventBus from "./common/EventBus";

import EmployeeList from "./components/EmployeeComponents/EmployeeList";
import EmployeeDetails from "./components/EmployeeComponents/EmployeeDetails";
import AddEmployee from "./components/EmployeeComponents/AddEmployee";
import ViewEmployee from "./components/EmployeeComponents/ViewEmployee";
import UpdateEmployee from "./components/EmployeeComponents/UpdateEmployee";

import LeaveTypeList from "./components/LeaveManagementComponents/TypeComp/LeaveTypeList";
import LeaveTypeListUser from "./components/LeaveManagementComponents/TypeComp/LeaveTypeListUsers";
import AddLeaveType from "./components/LeaveManagementComponents/TypeComp/AddLeaveType";
import UpdateLeaveType from "./components/LeaveManagementComponents/TypeComp/UpdateLeaveType";

import LeaveRequestList from "./components/LeaveManagementComponents/LeaveRequestComp/LeaveRequestList";
import LeaveRequestListUser from "./components/LeaveManagementComponents/LeaveRequestCompUser/LeaveRequestListUser";
import UpdateLeaveRequestUser from "./components/LeaveManagementComponents/LeaveRequestCompUser/UpdateLeaveRequestUser";
import AddLeaveRequest from "./components/LeaveManagementComponents/LeaveRequestCompUser/AddLeaveRequestUser";

import LeaveBalanceList from "./components/LeaveManagementComponents/LeaveBalanceComp/LeaveBalanceList";
import LeaveBalanceListUser from "./components/LeaveManagementComponents/LeaveBalanceComp/LeaveBalanceListUser";

import CustomerJobPortal from "./components/JobManagementComponents/CustomerJobPortal/CustomerJobPortal";
import HrJobPortal from "./components/JobManagementComponents/HrJobPortal/HrJobPortal"
import TrackStatus from "./components/JobManagementComponents/CustomerJobPortal/TrackStatus";

import HrHome from "./components/UserComponents/HrHome";
//import UserList from "./components/UserComponentsAdmin/UserList";
import EmployeeHome from "./components/UserComponents/EmployeeHome";
import UserList from "./components/UserComponentsAdmin/UserList";

import AttendanceList from "./components/AttendanceComponents/AttendanceList";
import UpdateAttendance from "./components/AttendanceComponents/UpdateAttendance";
import SingleEmpAttendance from "./components/AttendanceComponents/SingleEmpAttendance";
import MarkAttendance from "./components/AttendanceComponents/MarkAttendance";
import PendingList from "./components/AttendanceComponents/PendingList";

import { Details } from "@mui/icons-material";
import JobDetails from "./components/JobManagementComponents/HrJobPortal/JobDetails";
import AllJob from "./components/JobManagementComponents/CustomerJobPortal/AllJob";

import ProfileNavigationItem from "./components/DashBoardComponents/ProfileNavigationItem";
import PostJob from "./components/JobManagementComponents/HrJobPortal/PostJob";
import Contact from "./components/Contact";
import { Typography } from "@mui/material";


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      sidebarOpen: false,
    };

    history.listen((location) => {
      props.dispatch(clearMessage());
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    history.push("/login"); 
    window.location.reload();
    window.location.reload();
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>

          <nav className="navbar navbar-expand navbar-dark" style={{ backgroundColor: '#98144d' }}>
            <Link to={"/"} className="navbar-brand">
              <img src="./logo-cropped.webp" height={40}></img> &nbsp; HRMS/Job Portal System
            </Link>
            <div className="navbar-nav mr-auto">

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    Resource
                  </Link>
                </li>
              )}
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <ProfileNavigationItem logOut={this.logOut} />
                </li>
                {/* <li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li> */}
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/dev"} className="nav-link">
                    <Typography>Contact Us</Typography>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    <Typography>Login</Typography>
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li> */}
              </div>
            )}
          </nav>

          <div className="container mt-3" style={{ marginRight:"8rem", width: "1420px", height: "82vh" }}>
            {/* height: "84vh" */}
            <Switch>
              <Route exact path={["/", "/login"]} component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dev" component={Contact} />
              <Route exact path="/profile" component={Profile} />

              {currentUser && currentUser.role === 'Admin' && (
                <>
                  <Route exact path="/hr-home" render={(props) => <HrHome {...props} user={this.props.user} />} />
                  <Route exact path="/register" component={Register} />

                  <Route exact path="/employee-list" render={(props) => <EmployeeList {...props} user={this.props.user} />} />
                  <Route exact path="/add-employee" render={(props) => <AddEmployee {...props} user={this.props.user} />} />
                  <Route exact path="/update-employee/:employeeId" render={(props) => <UpdateEmployee {...props} user={this.props.user} />} />
                  <Route exact path="/view-employee/:employeeId" render={(props) => <ViewEmployee {...props} user={this.props.user} />} />

                  <Route exact path="/leave-requests" render={(props) => <LeaveRequestList {...props} user={this.props.user} />} />
                  <Route exact path="/leave-balances" render={(props) => <LeaveBalanceList {...props} user={this.props.user} />} />

                  <Route exact path="/leave-types" render={(props) => <LeaveTypeList {...props} user={this.props.user} />} />
                  <Route exact path="/addLeaveTypes" render={(props) => <AddLeaveType {...props} user={this.props.user} />} />
                  <Route exact path="/updateLeaveType/:typeId" render={(props) => <UpdateLeaveType {...props} user={this.props.user} />} />
                  <Route exact path="/user-list" render={(props) => <UserList {...props} user={this.props.user} />} />

                  <Route path="/pending-list" render={(props) => <PendingList {...props} user={this.props.user} />} />
                  <Route path="/attendance-list" render={(props) => <AttendanceList {...props} user={this.props.user} />} />
                  <Route path="/updateAttendance/:attendanceId" render={(props) => <UpdateAttendance {...props} user={this.props.user} />} />

                </>
              )}

              {currentUser && currentUser.role === 'Employee' && (
                <>
                  <Route exact path="/employee-home" render={(props) => <EmployeeHome {...props} user={this.props.user} />} />
                  <Route exact path="/emp-details" render={(props) => <EmployeeDetails {...props} user={this.props.user} />} />

                  <Route exact path="/leave-request-user" render={(props) => <LeaveRequestListUser {...props} user={this.props.user} />} />
                  <Route exact path="/add-leave-request" render={(props) => <AddLeaveRequest {...props} user={this.props.user} />} />
                  <Route exact path="/update-leave-request/:requestId" render={(props) => <UpdateLeaveRequestUser {...props} user={this.props.user} />} />
                  <Route exact path="/leave-balance-user" render={(props) => <LeaveBalanceListUser {...props} user={this.props.user} />} />
                  <Route exact path="/leave-types-user" render={(props) => <LeaveTypeListUser {...props} user={this.props.user} />} />

                  <Route path="/mark-attendance" render={(props) => <MarkAttendance {...props} user={this.props.user} />} />
                  <Route path="/your-attendance/:employeeId" render={(props) => <SingleEmpAttendance {...props} user={this.props.user} />} />
                </>

              )}


              <Route exact path="/user" component={User} />
              <Route exact path="/EmpJobPortal/:empid" component={CustomerJobPortal} />
              <Route exact path="/Hrjob" component={HrJobPortal} />
              <Route exact path="/trackStatus/:empid" component={TrackStatus} />
              <Route exact path="/AppliedJobs/:jobProfile" component={JobDetails} />
              <Route exact path="/PostJob" component={PostJob} />
              <Route exact path="/EmpJobPortal/:empid" component={CustomerJobPortal} />
              <Route exact path="/Hrjob" render={(props) => <HrJobPortal {...props} user={this.props.user} />} />
              <Route exact path="/trackStatus/:empid" component={TrackStatus} />
              <Route exact path="/AppliedJobs/:jobProfile" component={JobDetails} />

              <Route exact path="/EmpJobPortal/:empid" component={CustomerJobPortal} />
              <Route exact path="/Hrjobs" component={HrJobPortal} />
              <Route exact path="/trackStatus/:empid" component={TrackStatus} />
             <Route path = "/editJobDetails/:id" component = {PostJob}/>

              {/* <Route path="/mark-attendance/:employeeId" render={(props) => <MarkAttendance {...props} user={this.props.user} />} /> */}
              {/* <Route exact path="/job" component={AllJob} /> */}

              
             
            </Switch>
          </div>
          <footer style={{ margin: "4px", textAlign: "center" }}>
            <Typography variant="body2" color="textSecondary">
              © {new Date().getFullYear()} ARP. All rights reserved.
            </Typography>
          </footer>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);