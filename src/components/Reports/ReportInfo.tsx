import { Card, Descriptions, Progress, Statistic, Tabs } from 'antd'
import { useMemo } from 'react'
import { UseQuery, UseQueryProps } from 'utils/fetches'
/**@ts-ignore */
import ReportViewer from 'react-lighthouse-viewer'
import { REPORT_INFO_TAB } from './ReportList'

interface ReportInfoData {
  timestamp: number
  task: {
    id: string
    name: string
  }
  data: {
    score: number
    [key: string]: string | number | object
  }
}
interface ReportInfoInterface {
  activeTabKey: REPORT_INFO_TAB
  onChangeTabKey: (activeKey: string) => void
}

const ReportInfo = ({ data, activeTabKey, onChangeTabKey }: UseQueryProps<ReportInfoInterface>) => {
  const report = useMemo<ReportInfoData>(() => data?.getReportInfoByTimestamp || {}, [data?.getReportInfoByTimestamp])
  const numericAudits = useMemo(
    () => Object.values(report?.data?.audits || {}).filter((audit) => audit?.scoreDisplayMode === 'numeric'),
    [report?.data?.audits],
  )

  return (
    <Tabs defaultActiveKey={activeTabKey} tabPosition='left' onChange={onChangeTabKey}>
      <Tabs.TabPane key={REPORT_INFO_TAB.REPORT} tab='Report'>
        {!!report?.data && <ReportViewer json={report?.data} />}
      </Tabs.TabPane>
      <Tabs.TabPane key={REPORT_INFO_TAB.SCORES} tab='Scores'>
        <Descriptions colon={false}>
          {numericAudits.map((audit) => (
            <Descriptions.Item
              key={audit.title}
              label={
                <Progress
                  type='circle'
                  width={64}
                  percent={audit.score * 100}
                  format={audit.score === 1 ? undefined : () => Number(audit.score.toFixed(2))}
                />
              }
            >
              <Statistic
                title={audit.title}
                formatter={() => audit.displayValue || `${audit.numericValue} ${audit.numericUnit}`}
              />
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Tabs.TabPane>
    </Tabs>
  )
}

export default UseQuery(ReportInfo)`
query GetReportInfoByTimestamp($taskType: TaskType, $timestamp: Float) {
    getReportInfoByTimestamp(taskType: $taskType, timestamp: $timestamp) {
        task {
            id
            name
        }
        timestamp
        data
    }
}
`
