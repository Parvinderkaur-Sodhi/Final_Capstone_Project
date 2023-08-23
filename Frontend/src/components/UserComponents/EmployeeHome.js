import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import EmployeeNavbar from "../DashBoardComponents/EmployeeNavbar";


function EmployeeHome(props) {
  const { user: currentUser } = props;


  useEffect(() => {
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <EmployeeNavbar/>
        <h1>Hello employee with employee ID</h1>
    </div>
  );
}

export default EmployeeHome;
