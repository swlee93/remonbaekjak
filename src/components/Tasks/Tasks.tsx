import { useState } from 'react'
import TaskList from './TaskList'
import { HeaderPlace } from 'components/Header'

import AddTask from './AddTask'

const Task = () => {
  const [refetchTrigger, setRefetchTrigger] = useState<null | Number>(null)

  return (
    <>
      <HeaderPlace>
        <AddTask setRefetchTrigger={setRefetchTrigger} />
      </HeaderPlace>
      <TaskList refetchTrigger={refetchTrigger} setRefetchTrigger={setRefetchTrigger} />
    </>
  )
}

export default Task