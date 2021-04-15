import { ExpandOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Button, Collapse, Divider, Drawer, Space } from 'antd'
import ButtonGroup from 'antd/lib/button/button-group'

import Text from 'antd/lib/typography/Text'
import { useState } from 'react'

import ReportInfo from './ReportInfo'
import { REPORT_INFO_TAB } from './ReportList'
interface ReportInfoDrawerProps {
  reportInfo: any
  showReportInfo: boolean
  setShowReportInfo: (visible: boolean) => void
}

const ReportInfoDrawer = ({ reportInfo, showReportInfo, setShowReportInfo }: ReportInfoDrawerProps) => {
  const [reportInfoTabKey, setReportInfoTabKey] = useState<REPORT_INFO_TAB>(REPORT_INFO_TAB.REPORT)

  const [isExpand, setExpand] = useState(false)

  return (
    <Drawer
      visible={showReportInfo}
      onClose={() => setShowReportInfo(false)}
      placement='bottom'
      height={isExpand ? '100vh' : '50vh'}
      mask={false}
      title={
        <Space split={<Divider type='vertical' />}>
          <Text>{reportInfo?.task?.name} </Text>
          <Text>{new Date(reportInfo?.timestamp || 0).toLocaleString()} </Text>
          <ButtonGroup>
            <Button icon={isExpand ? <ShrinkOutlined /> : <ExpandOutlined />} onClick={() => setExpand(!isExpand)} />
          </ButtonGroup>
        </Space>
      }
    >
      <ReportInfo
        timestamp={reportInfo?.timestamp}
        activeTabKey={reportInfoTabKey}
        onChangeTabKey={setReportInfoTabKey}
      />
    </Drawer>
  )
}

export default ReportInfoDrawer
