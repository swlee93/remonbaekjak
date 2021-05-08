import { useState } from 'react'
import TaskList from './TaskList'
import { HeaderPlace } from 'components/Header'

import AddTask from './AddTask'
import Processing from './Processing'

const Monitors = () => {
  const [refetchTrigger, setRefetchTrigger] = useState<null | Number>(null)

  return (
    <>
      <HeaderPlace>
        <AddTask setRefetchTrigger={setRefetchTrigger} />
      </HeaderPlace>
      <Processing />
      <TaskList refetchTrigger={refetchTrigger} setRefetchTrigger={setRefetchTrigger} />
    </>
  )
}

export default Monitors
