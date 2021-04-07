import { HeaderPlace } from 'components/Header'
import React from 'react'
import { StyledContent } from 'styles/LayoutStyles'
import { UseQuery, UseQueryProps } from 'utils/fetches'
import ReportList from './ReportList'
import ScoreChart from './ScoreChart'
interface ReportsInterface {}
const Reports = () => {
  return (
    <StyledContent gap='20px'>
      <ScoreChart />

      <ReportList />
    </StyledContent>
  )
}

export default Reports
