import { Children, Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Line, History } from 'components/Chart'
import TableOfContents, { TableOfContentsItem } from 'components/TableOfContents'
import { THIRD_PARTY } from 'contexts/ApolloProvider'
import { UseQuery, UseQueryProps } from 'utils/fetches'
import { groupBy, Dictionary } from 'lodash'
import { Card, Col, List, Row } from 'antd'

const NOT_A_METRICS = ['time', 'taskId']

const CardInnerLayout = ({ children }: any) => {
  const array = Children.toArray(children)

  if (array.length === 1) return children

  return <div style={{ display: 'grid' }}>{children}</div>
}

function LightHouseMetrics({ data, containerId }: UseQueryProps<any>) {
  const performanceData = data?.getLightHouseData?.performance || []

  const performanceDatakeys = useMemo(() => {
    return Object.entries(performanceData?.[0] || {}).reduce<string[]>((acc, [key, value]) => {
      if (!NOT_A_METRICS.includes(key) && (Number(value) || value == 0)) {
        acc.push(key)
      }
      return acc
    }, [])
  }, [performanceData])

  const dataKeysByChunkedName = useMemo<Dictionary<string[]>>(() => {
    return groupBy(performanceDatakeys, (dataKey) => dataKey.match(/(^|[A-Z])[a-z]+/g)?.[0])
  }, [performanceDatakeys])

  return (
    <>
      <History client={THIRD_PARTY.GITHUB} />
      {Object.entries(dataKeysByChunkedName).map(([groupName, yFields], index) => {
        const title = groupName
        const linkId = groupName
        return (
          <Card id={linkId} key={groupName} title={groupName}>
            <TableOfContentsItem key={index} title={title} linkId={linkId} scrollFromId={containerId} />
            <CardInnerLayout>
              {yFields.map((yField) => {
                return <Line key={yField} data={performanceData} yField={yField} />
              })}
            </CardInnerLayout>
          </Card>
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
