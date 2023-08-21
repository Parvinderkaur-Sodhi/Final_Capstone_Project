import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import employeeService from '../../../services/employee.service';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
const AppliedJobs = () => {
  function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
const [appliedJob,setAppliedJob]=useState([]);
const {empid}=useParams();
console.log(empid);
useEffect(()=>{
employeeService.getAppliedJobforEmp(empid).then((response) => {
            setAppliedJob(response.data)
            console.log(response.data);
        }).catch(error =>{
            console.log(error);
        })
},[])


  return (
    <div>
    <TableContainer component={Card}>
      <Table width="400px" aria-label="simple table">
        <colgroup>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>
        <col style={{width:'1%'}}/>

        </colgroup>
        <TableHead>
          <TableRow sx={{backgroundColor:"grey"}}>
            <TableCell >Job Profile</TableCell>
            <TableCell>Status</TableCell>
            <TableCell >Published date</TableCell>
            <TableCell >Salary</TableCell>
            <TableCell >Last date</TableCell>
            <TableCell>Action</TableCell>

          </TableRow>
        </TableHead>
        {/* <TableBody>
        {appliedJob.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } ,height:20}}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.calories}</TableCell>
              <TableCell>{row.fat}</TableCell>
              <TableCell>{row.carbs}</TableCell>
              <TableCell>{row.protein}</TableCell>
            </TableRow>
          ))}  
        </TableBody> */}
      </Table>
    </TableContainer>
 

    </div>
  )
}

export default AppliedJobs