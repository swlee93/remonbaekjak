import React, { useState, useEffect, useMemo } from 'react'
import { Line as AntdLine } from '@ant-design/charts'
import ErrorBoundary from 'components/ErrorBoundary'
import { Card } from 'antd'

interface LineInterface {
  yField: string
  seriesField?: string
  xField?: string
  data: any[]
  loading?: boolean
  chartOnly?: boolean
}

const Line = ({ data, yField, xField = 'time', seriesField, loading, chartOnly = false }: LineInterface) => {
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
    <ErrorBoundary>
      {chartOnly ? (
        <AntdLine loading={loading} {...(config || {})} />
      ) : (
        <Card size='small' title={yField}>
          <AntdLine loading={loading} {...(config || {})} />
        </Card>
      )}
    </ErrorBoundary>
  )
}

export default Line
