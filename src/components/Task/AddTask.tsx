import React, { useState } from 'react'
import { Affix, Button, Drawer, Input } from 'antd'
import TaskForm from './TaskForm'

import { PlusCircleOutlined } from '@ant-design/icons'
interface AddTaskProps {}
const AddTask = ({}: AddTaskProps) => {
  const [isAddTaskFormVisible, setAddTaskFormVisible] = useState(false)
  const onClickAddTask = () => {
    setAddTaskFormVisible(true)
  }

  return (
    <>
      <Button type='text' icon={<PlusCircleOutlined />} onClick={onClickAddTask}>
        Add Task
      </Button>
      <TaskForm visible={isAddTaskFormVisible} setVisible={setAddTaskFormVisible} />
    </>
  )
}

export default AddTask
