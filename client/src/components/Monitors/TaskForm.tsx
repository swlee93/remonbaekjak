import React, { useContext, useEffect } from 'react'
import { Button, Drawer, Form, Input, Radio } from 'antd'
import { UseMutation, UseMutationProps, UseQueryContext } from 'utils/fetches'
import TextArea from 'antd/lib/input/TextArea'

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
  setRefetchTrigger: (trigger: null | number) => void
}

const TaskForm = ({
  initialValues,
  visible,
  setVisible,
  onSubmit,
  called,
  loading,
  error,
  setRefetchTrigger,
}: UseMutationProps<TaskFormInterface>) => {
  const [form] = Form.useForm()
  const onValuesChange = ({}: {}) => {}

  const onSave = () => {
    form.submit()
  }

  const onFinish = (values: any = {}) => {
    if (values?.name) {
      if (onSubmit) {
        const { lh_request_url, ...rest } = values
        onSubmit({ ...rest, tags: [{ key: 'lh_request_url', value: lh_request_url }] })
      }
    }
  }

  useEffect(() => {
    if (called) {
      if (loading) {
      } else if (error) {
        console.error(error)
      } else if (typeof setRefetchTrigger === 'function') {
        setRefetchTrigger(Math.random())
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
          requiredMark={true}
          form={form}
          initialValues={initialValues}
          onValuesChange={onValuesChange}
          onFinish={onFinish}
        >
          <Form.Item label='Task Type' name='type' style={{ display: 'none' }}>
            <Radio.Group>
              <Radio.Button defaultChecked={true} value={TaskType.LIGHTHOUSE}>
                {TaskType.LIGHTHOUSE}
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Name' name='name' required wrapperCol={{ span: 4 }}>
            <Input placeholder='Name' />
          </Form.Item>
          <Form.Item label='Description' name='description' wrapperCol={{ span: 8 }}>
            <Input placeholder='Description' />
          </Form.Item>
          <Form.Item label='Request URL' name='lh_request_url' required>
            <Input placeholder='http://' />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  )
}
export default UseMutation(TaskForm)`
    mutation CreateTask($name: String!, $description: String, $type: TaskType, $tags: [TagInput]) {
        createTask(name: $name, description: $description, type: $type, tags: $tags) {
        name,
        description,
        type,
        createdAt
      }
    } 
`
