import React from 'react'
import AppliedJobs from './AppliedJobs'
import Stack from '@mui/material/Stack'
import { Box, Card } from '@mui/material'
import EmployeeNavbar from '../../DashBoardComponents/EmployeeNavbar'

const TrackStatus = () => {
  return (
    <>
      <EmployeeNavbar />
        <AppliedJobs />
    </>
  )
}

export default TrackStatus