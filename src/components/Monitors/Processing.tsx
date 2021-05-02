import { gql, useSubscription } from '@apollo/client'
const UPDATE_TASK_STATE = gql`
  subscription {
    updateTaskState {
      action
      taskState {
        waits {
          name
        }
        doing {
          task {
            name
          }
        }
        done {
          task {
            name
          }
        }
      }
    }
  }
`
const Processing = () => {
  const { data, loading } = useSubscription(UPDATE_TASK_STATE)
  console.log('data', data, loading)
  return <></>
}
export default Processing
