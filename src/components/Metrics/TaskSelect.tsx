import { useEffect, useMemo, useState } from 'react'

import { Select } from 'antd'
import { UseQuery, UseQueryProps } from 'utils/fetches'

const TaskSelect = ({ data: _data_, loading, error, called, setTask }: UseQueryProps<any>) => {
  const data = useMemo(() => _data_?.getTasks || [], [_data_])
  const [selectedId, setSelectedId] = useState()
  const [selectedTask, setSelectedTask] = useState()
  const onSelect = (taskId: any, { task }: any) => {
    setSelectedId(taskId)
    setSelectedTask(task)
  }

  useEffect(() => {
    if (!selectedId && data?.length) {
      setSelectedId(data[0].id)
      setSelectedTask(data[0])
    }
  }, [called, data])

  useEffect(() => {
    if (setTask) {
      setTask(selectedTask)
    }
  }, [selectedTask])
  return (
    <Select loading={loading} onSelect={onSelect} value={selectedId}>
      {data.map((task: any) => (
        <Select.Option value={task.id} task={task}>
          {task.name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default UseQuery(TaskSelect)`
  query {
    getTasks {
      id,
      description,
      type,
      name,
      createdBy,
      createdAt
    }
  }
`
