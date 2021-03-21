import React, { useContext, useState } from 'react'
import { Affix, Button, Input } from 'antd'
import TaskForm from './TaskForm'
import { UseQuery, UseQueryContext, UseQueryProps } from 'utils/fetches'
import TaskList from './TaskList'
import { HeaderPlace } from 'components/Header'
import { PlusCircleOutlined } from '@ant-design/icons'
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
