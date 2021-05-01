import { Button } from 'antd'

import { DeleteOutlined } from '@ant-design/icons'
import { gql, useMutation } from '@apollo/client'
import { UseMutation, UseMutationProps } from 'utils/fetches'
interface DeleteTaskProps {
  taskId: string
}

const DeleteTask = ({ taskId, onSubmit, setRefetchTrigger }: UseMutationProps<DeleteTaskProps>) => {
  const onClickDelete = () => {
    onSubmit({ id: Number(taskId) })
    if (setRefetchTrigger) {
      setRefetchTrigger(Math.random())
    }
  }
  return <Button type='text' icon={<DeleteOutlined />} onClick={onClickDelete} />
}

export default UseMutation(DeleteTask)`
  mutation DeleteTask($id: Int) {
    deleteTask(id: $id) {
      id
    }
  }
`
