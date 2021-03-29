import React, { useState } from 'react'
import { Button, Drawer, Space } from 'antd'

import { ExceptionOutlined } from '@ant-design/icons'

import LightHouseReport from './LightHouseReport'

const TaskListAction = (props: { text: string; record: any }) => {
  const { text, record } = props
  const [visible, setVisible] = useState(false)
  return (
    <Space size='middle'>
      <Button type='link' icon={<ExceptionOutlined />} onClick={() => setVisible(true)} />
      <Drawer
        bodyStyle={{ display: 'flex', flexFlow: 'column', padding: 0 }}
        width='300px'
        title={'Reports'}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <LightHouseReport {...record} />
      </Drawer>
    </Space>
  )
}

export default TaskListAction
