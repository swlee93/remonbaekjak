import { useEffect, useMemo, useState } from 'react'
import { Card, Space } from 'antd'
import { HeaderPlace } from 'components/Header'
import TimeSelect, { Time } from 'components/Options/TimeSelect'
import { StyledContent, HorizontalScroll, HorizontalScrollItem } from 'styles/LayoutStyles'
import ReportInfoDrawer from './ReportInfoDrawer'
import ReportList from './ReportList'
import ReportOptionProvider from './ReportOptionProvider'

import { UseQuery, UseQueryProps } from 'utils/fetches'

const Reports = ({ data }: UseQueryProps<any>) => {
  const [time, setTime] = useState<Time>({ stime: undefined, etime: undefined })
  const tasks = useMemo<any[]>(() => data?.getTasks, [data])

  return (
    <>
      <HeaderPlace>
        <Space>
          <TimeSelect onChange={setTime} />
        </Space>
      </HeaderPlace>
      <StyledContent gap='20px'>
        <ReportOptionProvider>
          {({ viewMode, compareA, compareB, onClickListItem, reportInfo, setShowReportInfo, showReportInfo }) => (
            <>
              <HorizontalScroll>
                {tasks?.map((task) => (
                  <HorizontalScrollItem style={{ width: '300px', minWidth: '300px' }} key={task?.id} title={task?.name}>
                    <ReportList
                      viewMode={viewMode}
                      taskId={task?.id}
                      stime={time?.stime}
                      etime={time?.etime}
                      compareA={compareA}
                      compareB={compareB}
                      onClickListItem={onClickListItem}
                    />
                  </HorizontalScrollItem>
                ))}
              </HorizontalScroll>
              <ReportInfoDrawer
                reportInfo={reportInfo}
                setShowReportInfo={setShowReportInfo}
                showReportInfo={showReportInfo}
              />
            </>
          )}
        </ReportOptionProvider>
      </StyledContent>
    </>
  )
}

export default UseQuery(Reports)`
  query {
    getTasks {
      id,
      description,
      type,
      name,
      createdAt
    }
  }
`
