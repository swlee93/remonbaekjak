import { useState } from 'react'
import TaskList from './TaskList'
import { HeaderPlace } from 'components/Header'

import AddTask from './AddTask'
import Processing from './Processing'

const Monitors = () => {
  const [isActionsVisible, setIsActionsVisible] = useState()
  const [refetchTrigger, setRefetchTrigger] = useState<null | Number>(null)

  return (
    <>
      <HeaderPlace>
        <AddTask setRefetchTrigger={setRefetchTrigger} />
        <Processing />
      </HeaderPlace>
      <TaskList refetchTrigger={refetchTrigger} setRefetchTrigger={setRefetchTrigger} />
    </>
  )
}

export default Monitors
