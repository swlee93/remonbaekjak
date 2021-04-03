import { Line, History } from 'components/Chart'
import TableOfContents, { TableOfContentsItem } from 'components/TableOfContents'
import { THIRD_PARTY } from 'contexts/ApolloProvider'
import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'

function LightHouseMetrics({ data, containerId }: UseQueryProps<any>) {
  const performanceData = data?.getLightHouseData?.performance || []

  const performanceDatakeys = useMemo(() => {
    return Object.entries(performanceData?.[0] || {}).reduce<string[]>((acc, [key, value]) => {
      if (key !== 'time' && (Number(value) || value == 0)) {
        acc.push(key)
      }
      return acc
    }, [])
  }, [performanceData])

  return (
    <>
      <History client={THIRD_PARTY.GITHUB} />
      {performanceDatakeys.map((yField, index) => {
        return (
          <>
            <TableOfContentsItem key={index} title={yField} linkId={yField} scrollFromId={containerId} />
            <Line linkId={yField} key={yField} data={performanceData} yField={yField} />
          </>
        )
      })}
    </>
  )
}

export default UseQuery(LightHouseMetrics)`
  query GetLightHouseData($id: ID!, $stime: Float, $etime: Float, $includeColumns: String) {
    getLightHouseData(taskId: $id, subtype: "performance", stime: $stime, etime: $etime, includeColumns: $includeColumns) {
      performance 
    }
  }
`
