import React from 'react'

import { UseQuery, UseQueryContext, UseQueryProps } from 'utils/fetches'
import TaskList from './TaskList'
import { HeaderPlace } from 'components/Header'

import AddTask from './AddTask'
const Task = ({ data, loading, error }: UseQueryProps<any>) => {
  return (
    <>
      <HeaderPlace>
        <AddTask />
      </HeaderPlace>
      <TaskList data={data?.getTasks} loading={loading} error={error} />
    </>
  )
}

export default UseQuery(Task)`
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
