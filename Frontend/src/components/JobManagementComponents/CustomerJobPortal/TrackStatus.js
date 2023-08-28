import React from 'react'
import FilterByStatus from './FilterByStatus'
import FilterJob from './FilterJob'
import SearchJob from './SearchJob'
import AppliedJobs from './AppliedJobs'
import Stack from '@mui/material/Stack'
import FilterByCategory from './FilterByCategory'
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