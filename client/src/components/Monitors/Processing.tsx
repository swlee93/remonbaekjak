import { gql, useSubscription } from '@apollo/client'
import { Carousel, Space } from 'antd'
import { FunctionComponent, useMemo } from 'react'
const UPDATE_TASK_STATE = gql`
  subscription {
    updateTaskState {
      action
      taskState {
        waits {
          id
        }
        doing {
          task {
            id
          }
          startedAt
        }
        done {
          task {
            id
          }
          endedAt
        }
      }
    }
  }
`

interface ProcessingChildrenProps {
  waits: { id: number }[]
  doing: {
    task: any
    startedAt: number
  }
  done: {
    task: any
    endedAt: number
  }
}
interface ProcessingProps {}
const Processing = ({}: ProcessingProps) => {
  const { data, loading } = useSubscription(UPDATE_TASK_STATE)
  const taskState = useMemo<ProcessingChildrenProps>(() => data?.updateTaskState?.taskState || {}, [
    data?.updateTaskState?.taskState,
  ])

  return <></>
}
export default Processing
