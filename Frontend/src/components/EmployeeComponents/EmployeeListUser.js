import React, { useState, useEffect } from "react";
import { Redirect, Link } from 'react-router-dom';
import HrService from "../../services/hr.service";

function EmployeeListUser(props) {
  const [employees, setEmployees] = useState([]);
  const { user: currentUser } = props;

  useEffect(() => {
    console.log(currentUser);
    // if (currentUser && currentUser.employeeId) {
    //   // Use currentUser.employeeId to identify the user's employeeId
    //   HrService.getEmployeeById(currentUser.employeeId)
    //     .then((response) => {
    //       console.log("Employee data:", response.data);
    //       console.log(currentUser);
    //       setEmployees(response.data);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }, [currentUser]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Employee List for a particular user</h1>
      {/* Render the list of employees here */}
    </div>
  );
}

export default EmployeeListUser;
