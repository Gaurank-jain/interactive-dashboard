import React from 'react'
import { Box } from '@mui/material'
import Header from "components/Header"
import BreakdownChart from "components/BreakdownChart";
import BarChart from 'components/BarChart';


const Breakdown = () => {
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="BREAKDOWN CHART" subtitle="Breakdown of sales by Category"/>
        <Box mt="40px" height="75vh">
            <BreakdownChart />
            {/* <BarChart /> */}
        </Box>
    </Box>
  )
}

export default Breakdown