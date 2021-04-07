import React, { useState, useEffect, useMemo } from 'react'
import { Line as AntdLine } from '@ant-design/charts'
import ErrorBoundary from 'components/ErrorBoundary'
import { Card, Space } from 'antd'
import Meta from 'antd/lib/card/Meta'
interface LineInterface {
  yField: string
  seriesField?: string
  xField?: string
  data: any[]
  loading?: boolean
  linkId?: string
}

const Line = ({ data, yField, xField = 'time', seriesField, loading, linkId }: LineInterface) => {
  const config: any = useMemo(
    () => ({
      data,
      xField,
      yField,
      seriesField,
      padding: 'auto',
      yAxis: { tickCount: 5 },
      xAxis: { tickCount: 5, label: { formatter: (v: number) => new Date(Number(v)).toLocaleString() } },
      slider: {
        start: 0,
        end: 1,
      },
    }),
    [data],
  )

  return (
    <>
      <ErrorBoundary>
        <Card id={linkId} loading={loading}>
          <Meta title={yField} />

          <AntdLine {...(config || {})} />
        </Card>
      </ErrorBoundary>
    </>
  )
}

export default Line
