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
import { Box, Button, CardContent, Divider, Drawer, FormControl, InputLabel, Pagination, Paper, Select, Stack, Typography } from '@mui/material';
import JobInfofCus from './JobInfofCus';
import { MenuItem } from '@material-ui/core';
import hrService from '../../../services/hr.service';
const AppliedJobs = () => {

  const [d, setD] = useState();
  const JobStatus = ["Inprocess", "Interview", "Accepted", "Rejected"];
  const [open, setOpen] = useState(false);
  const [appliedJob, setAppliedJob] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentappliedJob = appliedJob.slice(indexOfFirstJob, indexOfLastJob);
  const totalPageCount = Math.ceil(appliedJob.length / jobsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const  empid=localStorage.getItem("employeeId");
  console.log(empid);
  useEffect(() => {
    getAppliedJobs();
  }, [])

  const getAppliedJobs = () => {
    employeeService.getAppliedJobforEmp(empid).then((response) => {
      setAppliedJob(response.data)
      console.log(response.data);
    }).catch(error => {
      console.log(error);
    })
  }

  const handleChangeStatus = (e) => {
    if (e.target.value == "None") {
      getAppliedJobs();
    }
    else {
      employeeService.getByidandstatus(empid,e.target.value).then((response) => {
        setAppliedJob(response.data);
      })
    }
  }
  const checkColor = (status) => {
    if (status == "Inprocess")
      return "#76b5c5";
    if (status == "Accepted")
      return "#92e3b4";
    if (status == "Rejected")
      return "#D04b4b";
    if (status == "Interview")
      return "#fff59e";
  }
  const openDrawer = (index) => {
    setOpen(true);
    setD(index);
  }

  return (
    <>
      <Card style={{ height: "550px", width: 900, marginLeft: "50px", maxHeight: "84vh", overflowY: "auto", paddingRight: "17px" }}>
        <Stack direction="row" margin={2}>
          <Typography sx={{ fontSize: 30, color: "#98144b" }}>Applied Jobs : {appliedJob.length}</Typography>
          <FormControl style={{ borderColor: "#98144d", marginLeft: 1 }}>
            <InputLabel style={{ marginLeft: 400, marginTop: -5 }}>Status</InputLabel>
            <Select

              // value={category}
              label="Category"
              onChange={(e) => handleChangeStatus(e)}
              sx={{ borderColor: "#98144dd", marginLeft: 50, width: 120 }}
            >
              <MenuItem value="None">None</MenuItem>
              {JobStatus.map((i) =>
                <MenuItem value={i}>{i}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Stack>
        {currentappliedJob.length > 0 &&
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table stickyHeader>
              <colgroup>
                <col style={{ width: '1%' }} />
                <col style={{ width: '1%' }} />
                <col style={{ width: '1%' }} />
                <col style={{ width: '1%' }} />
                <col style={{ width: '1%' }} />
                <col style={{ width: '1%' }} />

              </colgroup>
              <TableHead stickyHeader position="sticky" top="0px" z-index="1" >

                <TableRow style={{
                  color: 'black',
                  backgroundColor: "lightgrey",
                  fontWeight: "bold"
                }}

                >
                  <TableCell >Application Id</TableCell>
                  <TableCell>Job Profile</TableCell>
                  <TableCell >Category</TableCell>
                  <TableCell >Status</TableCell>
                  <TableCell>More</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  appliedJob && currentappliedJob.map((j) =>
                  (
                    <>
                      <TableRow
                        key={j.applicationId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, height: 20 }}
                      >
                        <TableCell component="th" scope="row">{j.applicationId}</TableCell>
                        <TableCell>{j.job["jobProfile"]}</TableCell>
                        <TableCell >{j.job["category"]}</TableCell>
                        <TableCell >
                          <Box width={80} height={40} boxShadow={4} borderRadius={6} padding={1} style={{ backgroundColor: `${checkColor(j.status)}` }}>
                            {j.status}</Box></TableCell>


                        <TableCell><Button onClick={() => openDrawer(j.job.jobId)}>Info</Button></TableCell>
                        {d != null && <Drawer
                          variant="persistent"
                          anchor='right'
                          open={open}
                          onClose={() => setOpen(false)}
                          PaperProps={{ sx: { width: 350, height: 680, marginTop: 7 } }}
                        >

                          <JobInfofCus index={d} setOpen={setOpen} setD={setD} />
                        </Drawer>
                        }
                      </TableRow>
                    </>
                  )

                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        }
        {
          currentappliedJob.length == 0 && 
          <Typography fontSize={30} mt={10} ml={10} color="#98144d">No Result Found !!</Typography>
        }
     {currentappliedJob.length>0 &&   <Box style={{ display: "flex", justifyContent: "flex-end", marginTop: "auto" }}>
          <Pagination count={totalPageCount} page={currentPage} onChange={handlePageChange} color="primary" boundaryCount={1} siblingCount={0} />
        </Box>}
      </Card>
    </>
    // {
    //   applicatiJob.length==0 && 
    //   <Typography>No Application availabel</Typography>
    // }
  )
}

export default AppliedJobs