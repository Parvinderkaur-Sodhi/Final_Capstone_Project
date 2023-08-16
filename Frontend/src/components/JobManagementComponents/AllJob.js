import React from 'react'
//import EmployeeService from '../../services/Employee.service';
import EmployeeService from '../../services/Employee.service';


import { useEffect } from 'react';
import { useState } from 'react';

const AllJob = () => {
    const [customer, setCustomer] = useState([])
    useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));
const token=user["accessToken"];
        getAllCustomerDetails(token);
    }, []);

    const getAllCustomerDetails = (token) => {
        EmployeeService.getAllJobs(token).then((response) => {
            setCustomer(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
    }
  return (
    <div>AllJob</div>
  )
}

export default AllJob