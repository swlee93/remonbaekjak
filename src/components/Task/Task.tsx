import React from 'react'

import { UseQuery, UseQueryContext, UseQueryProps } from 'utils/fetches'
import TaskList from './TaskList'
import { HeaderPlace } from 'components/Header'

import AddTask from './AddTask'
const Task = () => {
  return (
    <>
      <HeaderPlace>
        <AddTask />
      </HeaderPlace>
      <TaskList />
    </>
  )
}

export default Task
