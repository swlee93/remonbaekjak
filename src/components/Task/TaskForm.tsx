import React, { useContext, useEffect } from 'react'
import { Button, Drawer, Form, Input, Radio } from 'antd'
import { UseMutation, UseMutationProps, UseQueryContext } from 'utils/fetches'

enum TaskType {
  'LIGHTHOUSE' = 'LIGHTHOUSE',
}
type TaskInterface = {
  name?: string
  description?: string
  type: TaskType
}

interface TaskFormInterface {
  initialValues?: TaskInterface
  visible: boolean
  setVisible: (visible: boolean) => void
}

const TaskForm = ({
  initialValues,
  visible,
  setVisible,
  onSubmit,
  called,
  loading,
  error,
}: UseMutationProps<TaskFormInterface>) => {
  const { refetch } = useContext(UseQueryContext)
  const [form] = Form.useForm()
  const onValuesChange = ({}: {}) => {}

  const onSave = () => {
    form.submit()
  }

  const onFinish = (values: any) => {
    if (values?.name) {
      if (onSubmit) {
        onSubmit(values)
      }
    }
  }
  useEffect(() => {
    if (called) {
      if (loading) {
      } else if (error) {
      } else if (typeof refetch === 'function') {
        refetch()
      }
    }
  }, [called, error, loading])
  useEffect(() => {
    if (!visible) {
      form.resetFields()
    }
  }, [visible])

  return (
    <div style={{ display: 'none' }}>
      <Drawer
        title={'Add Task'}
        placement='bottom'
        height='auto'
        visible={visible}
        onClose={() => setVisible(false)}
        footer={
          <Button type='primary' onClick={onSave}>
            Submit
          </Button>
        }
      >
        <Form
          layout='vertical'
          requiredMark={true}
          form={form}
          initialValues={initialValues}
          onValuesChange={onValuesChange}
          onFinish={onFinish}
        >
          <Form.Item label='Task Type' name='type'>
            <Radio.Group>
              <Radio.Button value={TaskType.LIGHTHOUSE}>{TaskType.LIGHTHOUSE}</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Name' name='name' required>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label='Description' name='descripton'>
            <Input placeholder='Description' />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
export default UseMutation(TaskForm)`
    mutation CreateTask($name: String!, $description: String, $type: TaskType) {
        createTask(name: $name, description: $description, type: $type) {
        name,
        description,
        type,
        createdBy,
        createdAt
      }
    } 
`
