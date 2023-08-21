import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";


function EmployeeHome(props) {
  const { user: currentUser } = props;


  useEffect(() => {
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
        <h1>Hello employee with employee ID</h1>
    </div>
  );
}

export default EmployeeHome;
