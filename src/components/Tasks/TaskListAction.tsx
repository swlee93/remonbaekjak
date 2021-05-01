import React, { useState } from 'react'
import ButtonGroup from 'antd/lib/button/button-group'
import { Button, Drawer, Space } from 'antd'

import { DeleteRowOutlined, ExceptionOutlined, LineChartOutlined } from '@ant-design/icons'

import LightHouseReport from './LightHouseReport'
import LightHouseMetrics from './LightHouseMetrics'
import TableOfContents from 'components/TableOfContents'
import DeleteTask from './DeleteTask'

const TaskListAction = (props: { record: any; setRefetchTrigger: Function }) => {
  const { record, setRefetchTrigger } = props
  const [isReportListVisible, setReportListVisible] = useState(false)
  const [isMetricsVisible, setMetricsVisible] = useState(false)
  return (
    <Space size='middle'>
      <ButtonGroup>
        <Button type='link' icon={<ExceptionOutlined />} onClick={() => setReportListVisible(true)} />
        <Button type='link' icon={<LineChartOutlined />} onClick={() => setMetricsVisible(true)} />
        <DeleteTask taskId={record.id} setRefetchTrigger={setRefetchTrigger} />
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
        width='70vw'
        title={'Metrics'}
        visible={isMetricsVisible}
        onClose={() => setMetricsVisible(false)}
      >
        <TableOfContents fixedOnMask={true} />
        <LightHouseMetrics {...record} />
      </Drawer>
    </Space>
  )
}

export default TaskListAction
