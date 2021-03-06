import { gql, useSubscription } from '@apollo/client'
import { Button, Drawer, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'
/**@ts-ignore */
import ReportViewer from 'react-lighthouse-viewer'

function LightHouseReport({ data }: UseQueryProps<any>) {
  const array = data?.getLightHouseData?.report || []

  const [report, setReport] = useState<string>('')

  return (
    <>
      {array.map(({ timestamp, data }: any, i: number) => {
        const time = new Date(timestamp).toUTCString()
        return (
          <Button type='text' key={i} onClick={() => setReport(JSON.parse(data))}>
            {time}
          </Button>
        )
      })}
      <Drawer
        bodyStyle={{ padding: 0 }}
        title={<>Lighthouse</>}
        visible={!!report}
        onClose={() => setReport('')}
        width={'80vw'}
      >
        {!!report && <ReportViewer json={report} />}
      </Drawer>
    </>
  )
}

export default UseQuery(LightHouseReport)`
  query GetLightHouseData($id: ID!, $stime: Float, $etime: Float) {
    getLightHouseData(taskId: $id, subtype: "report", stime: $stime, etime: $etime) {
      report {
        data
        timestamp
      }
    }
  }
`
