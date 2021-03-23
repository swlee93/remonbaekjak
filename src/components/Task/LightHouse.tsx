import { gql, useSubscription } from '@apollo/client'
import { Button, Drawer, Input } from 'antd'
import { useEffect, useState } from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'
/**@ts-ignore */
import ReportViewer from 'react-lighthouse-viewer'

// const LIGHTHOUSE_SUBSCRIPTION = gql`
//   subscription GetLightHouseData($taskId: ID!) {
//     getLightHouseData(taskId: $taskId) {
//       report
//       performance
//     }
//   }
// `
// function LightHouse({ id: taskId }: any) {
//   const { data, loading, error } = useSubscription(LIGHTHOUSE_SUBSCRIPTION, { variables: { taskId } })
//   const getLightHouseData = data?.getLightHouseData
//   console.log('getLightHouseData', data, error)
//   return <div dangerouslySetInnerHTML={{ __html: getLightHouseData?.report }} />
// }

function LightHouse({ id: taskId, setOptions, data, error }: UseQueryProps<any>) {
  useEffect(() => {
    setOptions({ variables: { taskId } })
  }, [taskId])
  const array = data?.getLightHouseData || []

  const [report, setReport] = useState<string>('')
  const [performance, setPerformance] = useState<string>('')

  return (
    <>
      {array.map(({ timestamp, report, performance }: any, i: number) => {
        const time = new Date(timestamp).toUTCString()
        return (
          <Button type='text' key={i} onClick={() => setReport(JSON.parse(report))}>
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

export default UseQuery(LightHouse)`
  query GetLightHouseData($taskId: ID!) {
    getLightHouseData(taskId: $taskId) {
      report
      performance
      timestamp
    }
  }
`
