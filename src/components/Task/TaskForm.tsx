import React, { useEffect } from 'react'
import { Button, Drawer, Form, Input, Radio } from 'antd'

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

const TaskForm = ({ initialValues, visible, setVisible }: TaskFormInterface) => {
  const [form] = Form.useForm()

  const onValuesChange = ({}: {}) => {}

  const onSave = () => {
    form.submit()
  }

  const onFinish = (values: any) => {
    console.log('Finish:', values)
  }

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    }
  }, [visible])

  return (
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
  )
}
export default TaskForm
