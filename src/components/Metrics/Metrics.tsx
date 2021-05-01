import React, { useState } from 'react'
import { HeaderPlace } from 'components/Header'
import TableOfContents, { TableOfContentsProvider } from 'components/TableOfContents'
import { StyledContent, StyledSider } from 'styles/LayoutStyles'
import LightHouseMetrics from 'components/Monitors/LightHouseMetrics'
import TaskSelect from 'components/Options/TaskSelect'
import TimeSelect, { Time } from 'components/Options/TimeSelect'
import { Space } from 'antd'
const Metrics = () => {
  const [task, setTask] = useState()
  const [time, setTime] = useState<Time>({ stime: undefined, etime: undefined })
  return (
    <>
      <TableOfContentsProvider containerId={'settings_container'} scrollFromId={'scroll_container'}>
        <HeaderPlace>
          <Space>
            <TaskSelect setTask={setTask} />
            <TimeSelect onChange={setTime} />
          </Space>
        </HeaderPlace>
        <StyledSider>
          <TableOfContents />
        </StyledSider>
        <StyledContent gap='20px' id='scroll_container'>
          {task && <LightHouseMetrics {...task} {...time} containerId='scroll_container' />}
        </StyledContent>
      </TableOfContentsProvider>
    </>
  )
}
export default Metrics
