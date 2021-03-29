import React, { useState } from 'react'
import ButtonGroup from 'antd/lib/button/button-group'
import { Button, Drawer, Space } from 'antd'

import { ExceptionOutlined, LineChartOutlined } from '@ant-design/icons'

import LightHouseReport from './LightHouseReport'
import LightHouseMetrics from './LightHouseMetrics'

const TaskListAction = (props: { text: string; record: any }) => {
  const { text, record } = props
  const [isReportListVisible, setReportListVisible] = useState(false)
  const [isMetricsVisible, setMetricsVisible] = useState(false)
  return (
    <Space size='middle'>
      <ButtonGroup>
        <Button type='link' icon={<ExceptionOutlined />} onClick={() => setReportListVisible(true)} />
        <Button type='link' icon={<LineChartOutlined />} onClick={() => setMetricsVisible(true)} />
      </ButtonGroup>
      <Drawer
        bodyStyle={{ display: 'flex', flexFlow: 'column', padding: 0 }}
        width='300px'
        title={'Reports'}
        visible={isReportListVisible}
        onClose={() => setReportListVisible(false)}
      >
        <LightHouseReport {...record} />
      </Drawer>
      <Drawer
        bodyStyle={{ display: 'flex', flexFlow: 'column', padding: 0 }}
        width='300px'
        title={'Reports'}
        visible={isMetricsVisible}
        onClose={() => setMetricsVisible(false)}
      >
        <LightHouseMetrics {...record} />
      </Drawer>
    </Space>
  )
}

export default TaskListAction
