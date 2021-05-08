import { Card, Col, Descriptions, Progress, Row, Space, Statistic, Tooltip } from 'antd'
import Text from 'antd/lib/typography/Text'
import { useMemo } from 'react'

import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from '@ant-design/icons'

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

const toFixed = (value: number = 0) => Number(value.toFixed(2))

const ReportCompareView = ({ compareA, compareB }: ReportCompareViewInterface) => {
  const audits = useMemo(() => {
    const compareBAudits = compareB?.data?.audits || {}
    return Object.entries(compareA?.data?.audits || {}).reduce<any[]>((acc, [auditKey, audit]) => {
      const bAudit = compareBAudits[auditKey] || {}
      acc.push({ ...audit, bAudit })

      return acc
    }, [])
  }, [compareA?.data?.audits, compareB?.data?.audits])

  if (!compareA || !compareB) return <Text>!compareA || !compareB</Text>
  return (
    <>
      <Row justify='space-between'>
        {audits.map((audit: any, index: number) => {
          const isSame = audit.score === audit.bAudit.score
          const isUp = audit.score - audit.bAudit.score > 0
          const gap = toFixed(audit.numericValue - (audit.bAudit.numericValue || 0))
          const status = isSame ? 'secondary' : isUp ? 'success' : 'danger'

          return (
            <Col xl={6} md={4} sm={2} xs={1}>
              <Card hoverable={true} bordered={false}>
                <Descriptions title={audit.title} column={2} size='small'>
                  <Descriptions.Item label={<Text type='secondary'>A</Text>}>
                    {audit.displayValue || toFixed(audit.numericValue)}
                  </Descriptions.Item>
                  <Descriptions.Item label={<Text type='secondary'>B</Text>}>
                    {audit.bAudit.displayValue || toFixed(audit.bAudit.numericValue)}
                  </Descriptions.Item>
                </Descriptions>

                <Statistic
                  prefix={
                    <Text type={status}>{isSame ? undefined : isUp ? <ArrowUpOutlined /> : <ArrowDownOutlined />}</Text>
                  }
                  formatter={() => <Text type={status}>{gap}</Text>}
                  suffix={<Text type={status}>{audit.numericUnit}</Text>}
                />

                <Progress
                  showInfo={false}
                  percent={isUp ? audit.score * 100 : audit.bAudit.score * 100}
                  strokeLinecap='square'
                  success={{ percent: isUp ? audit.bAudit.score * 100 : audit.score * 100, strokeColor: '#00000073' }}
                  status={isSame ? 'normal' : isUp ? 'success' : 'exception'}
                />
              </Card>
            </Col>
          )
        })}
      </Row>
    </>
  )
}
export default ReportCompareView
