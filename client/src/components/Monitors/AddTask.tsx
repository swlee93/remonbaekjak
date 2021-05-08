import React, { useState } from 'react'
import { Affix, Button, Drawer, Input } from 'antd'
import TaskForm from './TaskForm'

import { PlusCircleOutlined } from '@ant-design/icons'
interface AddTaskProps {
  setRefetchTrigger: (trigger: null | number) => void
}
const AddTask = ({ setRefetchTrigger }: AddTaskProps) => {
  const [isAddTaskFormVisible, setAddTaskFormVisible] = useState(false)
  const onClickAddTask = () => {
    setAddTaskFormVisible(true)
  }

  return (
    <>
      <Button type='primary' icon={<PlusCircleOutlined />} onClick={onClickAddTask}>
        Add Task
      </Button>
      <TaskForm
        visible={isAddTaskFormVisible}
        setVisible={setAddTaskFormVisible}
        setRefetchTrigger={setRefetchTrigger}
      />
    </>
  )
}

export default AddTask
