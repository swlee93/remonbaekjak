import React, { useState } from 'react'
import { Affix, Button, Drawer, Input } from 'antd'
import TaskForm from './TaskForm'
import { UseQuery, UseQueryProps } from 'utils/fetches'
import TaskList from './TaskList'
import { HeaderPlace } from 'components/Header'
import { PlusCircleOutlined } from '@ant-design/icons'
const AddTask = () => {
  const [isAddTaskFormVisible, setAddTaskFormVisible] = useState(false)
  const onClickAddTask = () => {
    setAddTaskFormVisible(true)
  }
  const onSave = () => {}

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
