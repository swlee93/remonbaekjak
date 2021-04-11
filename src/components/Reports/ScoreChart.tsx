import { Line } from 'components/Chart'
import React from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'
interface ScoreChartInterface {}
const ScoreChart = ({ data }: UseQueryProps<ScoreChartInterface>) => {
  console.log('data', data)
  const performanceData = data?.getLightHouseData?.performance || []
  return <Line data={performanceData} yField={'score'} seriesField='taskId' chartOnly={true} />
}

export default UseQuery(ScoreChart)`
query GetLightHouseData($stime: Float, $etime: Float) {
    getLightHouseData(subtype: "performance", stime: $stime, etime: $etime, includeColumns: "score") {
        performance 
    }
}
`
