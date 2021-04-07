import React from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'
interface ReportListInterface {}
const ReportList = ({ data }: UseQueryProps<ReportListInterface>) => {
  return <>ReportList</>
}
export default UseQuery(ReportList)`
query {
    getReportInfo {
        task {
            id
        }
        timestamp
    }
}
`
