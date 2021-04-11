import { Card, Descriptions, Progress, Space, Statistic, Tooltip } from 'antd'
import Text from 'antd/lib/typography/Text'
import { useMemo } from 'react'
import { ChartCard, MiniProgress } from 'ant-design-pro/lib/Charts'
import Trend from 'ant-design-pro/lib/Trend'

import Icon, { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from '@ant-design/icons'

interface ReportInfoData {
  timestamp: number
  task: {
    id: string
    name: string
  }
  data: {
    score: number
    audits: { [key: string]: any }
  }
}
interface ReportCompareViewInterface {
  compareA?: ReportInfoData
  compareB?: ReportInfoData
}
const ReportCompareView = ({ compareA, compareB }: ReportCompareViewInterface) => {
  const audits = useMemo(() => {
    const compareBAudits = compareB?.data?.audits || {}
    return Object.entries(compareA?.data?.audits || {}).reduce<any[]>((acc, [auditKey, audit]) => {
      const bAudit = compareBAudits[auditKey] || {}
      acc.push({ ...audit, bAudit })

      return acc
    }, [])
  }, [compareA?.data?.audits, compareB?.data?.audits])
  console.log('audits', audits)

  if (!compareA || !compareB) return <Text>!compareA || !compareB</Text>
  return (
    <>
      <Card>
        {audits.map((audit: any, index: number) => {
          const isSame = audit.score === audit.bAudit.score
          const isUp = audit.score - audit.bAudit.score > 0
          return (
            <Card.Grid key={index}>
              <Statistic
                prefix={isSame ? undefined : isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                title={audit.title}
                formatter={() => audit.displayValue || `${audit.numericValue} ${audit.numericUnit}`}
              />
              <Progress
                showInfo={false}
                percent={audit.score * 100}
                status={isSame ? 'normal' : isUp ? 'success' : 'exception'}
              />
            </Card.Grid>
          )
        })}
      </Card>
    </>
  )
}
export default ReportCompareView
