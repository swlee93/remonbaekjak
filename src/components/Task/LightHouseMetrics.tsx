import { useEffect, useState } from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'

function LightHouseMetrics({ id: taskId, setOptions, data, error }: UseQueryProps<any>) {
  useEffect(() => {
    setOptions({ variables: { taskId } })
  }, [taskId])
  const array = data?.getLightHouseData || []
  const [performance, setPerformance] = useState<string>('')

  return <></>
}

export default UseQuery(LightHouseMetrics)`
  query GetLightHouseData($taskId: ID!) {
    getLightHouseData(taskId: $taskId) {
      performance
      timestamp
    }
  }
`
