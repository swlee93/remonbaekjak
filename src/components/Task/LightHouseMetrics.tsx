import { useEffect, useState } from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'

function LightHouseMetrics({ data }: UseQueryProps<any>) {
  const performanceData = data?.getLightHouseData?.performance || []
  console.log('performanceData', performanceData)
  return <></>
}

export default UseQuery(LightHouseMetrics)`
  query GetLightHouseData($id: ID!, $stime: Float, $etime: Float, $includeColumns: String) {
    getLightHouseData(taskId: $id, subtype: "performance", stime: $stime, etime: $etime, includeColumns: $includeColumns) {
      performance 
    }
  }
`
