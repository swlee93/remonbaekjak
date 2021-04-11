import { ReactNode, useMemo, useState } from 'react'
import {
  CheckOutlined,
  EllipsisOutlined,
  ExpandOutlined,
  MoreOutlined,
  ShrinkOutlined,
  SplitCellsOutlined,
} from '@ant-design/icons'
import { Button, Divider, Drawer, List, Progress, Radio, Space, Checkbox } from 'antd'

import { UseQuery, UseQueryProps } from 'utils/fetches'
import ReportInfo from './ReportInfo'
import Text from 'antd/lib/typography/Text'
import ButtonGroup from 'antd/lib/button/button-group'
import { VIEW_MODE } from './Reports'

interface ReportListInterface {
  viewMode?: VIEW_MODE
  onChangeCompare?: (target: 'A' | 'B', reportInfo: any | undefined) => void
  compareA?: ReportInfoData
  compareB?: ReportInfoData
}
interface ReportInfoData {
  timestamp: number
  task: {
    id: string
    name: string
  }
  data: {
    score: number
  }
}

const ReportList = ({
  data,
  loading,
  viewMode,
  onChangeCompare,
  compareA,
  compareB,
}: UseQueryProps<ReportListInterface>) => {
  const reports = useMemo(() => data?.getReportInfo || [], [data])

  const [reportInfo, setReportInfo] = useState<ReportInfoData>()
  const [reportInfoTabKey, setReportInfoTabKey] = useState<'report' | 'scores'>('report')
  const [showReportInfo, setShowReportInfo] = useState<boolean>(false)
  const onClickReportInfoMore = (report: ReportInfoData) => {
    setReportInfo(report)
    setShowReportInfo(true)
  }
  const [isExpand, setExpand] = useState(false)
  const onClickListItem = (info: ReportInfoData) => {
    switch (viewMode) {
      case VIEW_MODE.COMPARE:
        if (onChangeCompare) {
          const isCompareA = compareA?.timestamp === info?.timestamp
          const isCompareB = compareB?.timestamp === info?.timestamp
          if (!compareA) {
            onChangeCompare('A', info)
          } else if (isCompareA) {
            onChangeCompare('A', undefined)
          } else if (!compareB) {
            onChangeCompare('B', info)
          } else if (isCompareB) {
            onChangeCompare('B', undefined)
          } else {
            onChangeCompare('B', info)
          }
        }
        break
      default:
    }
  }
  return (
    <>
      <List
        loading={loading}
        grid={{ gutter: 16, column: 4 }}
        split={false}
        dataSource={reports}
        renderItem={(info: ReportInfoData) => {
          const score = info?.data?.score
          const task = info.task || {}
          const timestamp = new Date(info.timestamp).toLocaleString()
          const isCompareA = compareA?.timestamp === info?.timestamp
          const isCompareB = compareB?.timestamp === info?.timestamp
          return (
            <List.Item
              onClick={() => onClickListItem(info)}
              key={task.id}
              extra={
                viewMode === VIEW_MODE.COMPARE ? (
                  <Button
                    type={isCompareA || isCompareB ? 'primary' : 'dashed'}
                    icon={<CheckOutlined />}
                    children={isCompareA ? 'A' : isCompareB ? 'B' : ''}
                  />
                ) : undefined
              }
              actions={[
                <Button
                  size='small'
                  type='text'
                  icon={<EllipsisOutlined />}
                  onClick={() => onClickReportInfoMore(info)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Progress
                    width={48}
                    type='circle'
                    percent={score}
                    format={score === 100 ? undefined : () => Number(score.toFixed(2))}
                  />
                }
                title={task.name}
                description={timestamp}
              />
            </List.Item>
          )
        }}
      />
      <Drawer
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
        placement='bottom'
        visible={showReportInfo}
        onClose={() => setShowReportInfo(false)}
      >
        <ReportInfo
          timestamp={reportInfo?.timestamp}
          activeTabKey={reportInfoTabKey}
          onChangeTabKey={setReportInfoTabKey}
        />
      </Drawer>
    </>
  )
}
export default UseQuery(ReportList)`
query GetReportInfo($taskType: TaskType, $stime: Float, $etime: Float) {
    getReportInfo(taskType: $taskType, stime: $stime, etime: $etime) {
        task {
            id
            name
        }
        timestamp
        data
    }
}
`
