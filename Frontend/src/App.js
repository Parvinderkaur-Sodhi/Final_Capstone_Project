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
import AllJob from "./components/JobManagementComponents/AllJob";
import EmployeeList from "./components/EmployeeComponents/EmployeeList";
import LeaveTypeList from "./components/LeaveManagementComponents/TypeComp/LeaveTypeList";
import LeaveTypeListUser from "./components/LeaveManagementComponents/TypeComp/LeaveTypeListUsers";
import LeaveRequestList from "./components/LeaveManagementComponents/LeaveRequestComp/LeaveRequestList";
import LeaveBalanceList from "./components/LeaveManagementComponents/LeaveBalanceComp/LeaveBalanceList";
//import AdminDashboard from "./components/adminDashboard.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
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
    this.setState({
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <Link to={"/"} className="navbar-brand">
              HRMS/Job Portal System
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
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={this.logOut}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
            {/* {currentUser && currentUser.username === "Admin" && currentUser.email === "admin@gmail.com" && (
                <Route exact path="/admin-dashboard" component={AdminDashboard} />
              )} */}
              <Route exact path={["/", "/login"]} component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/user" component={User} />
              <Route exact path="/job" component={AllJob}/>
              <Route path="/employee-list" render={(props) => <EmployeeList {...props} user={this.props.user} />} />

             
              <Route path="/request-list" render={(props) => <LeaveRequestList {...props} user={this.props.user} />} />
              <Route path="/balance-list" render={(props) => <LeaveBalanceList {...props} user={this.props.user} />} />
              <Route path="/type-list" render={(props) => <LeaveTypeList {...props} user={this.props.user} />} />
              <Route path="/type-list-user" render={(props) => <LeaveTypeListUser {...props} user={this.props.user} />} />
            </Switch>
          </div>
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