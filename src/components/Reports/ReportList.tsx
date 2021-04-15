import { useEffect, useMemo, useState } from 'react'
import { CheckOutlined, ExpandOutlined, ShrinkOutlined } from '@ant-design/icons'
import { Button, Divider, Drawer, List, Progress, Space, Spin } from 'antd'

import { UseQuery, UseQueryProps } from 'utils/fetches'
import ReportInfo from './ReportInfo'
import Text from 'antd/lib/typography/Text'
import ButtonGroup from 'antd/lib/button/button-group'

import InfiniteScroll from 'react-infinite-scroller'
import { InfiniteScrollWrapper } from 'styles/LayoutStyles'
import { VIEW_MODE } from './ReportOptionProvider'
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
export enum REPORT_INFO_TAB {
  'REPORT' = 'REPORT',
  'SCORES' = 'SCORES',
}
const ReportList = ({
  data,
  loading,
  setOptions,
  refetch,
  stime,
  etime,
  viewMode,
  onClickListItem,
  compareA,
  compareB,
}: UseQueryProps<ReportListInterface>) => {
  const { pageInfo = {}, edges = [] } = useMemo<any>(() => data?.getReportInfos || {}, [data])

  const [dataSource, setDataSource] = useState<any>(edges)
  useEffect(() => {
    setDataSource([].concat(dataSource, edges))
  }, [pageInfo.endCursor])

  const handleInfiniteOnLoad = async () => {
    if (pageInfo.hasNextPage) {
      await setOptions({ variables: { after: Number(pageInfo.endCursor), stime, etime } })
      await refetch()
    }
  }

  return (
    <>
      <InfiniteScrollWrapper height={'calc(100% - 100px)'} hasNextPage={pageInfo.hasNextPage}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && pageInfo.hasNextPage}
          useWindow={false}
        >
          <List
            loading={loading}
            split={false}
            dataSource={dataSource}
            renderItem={(item: any) => {
              const info = item.node
              const score = info?.data?.score
              const task = info.task || {}
              const timestamp = new Date(info.timestamp).toLocaleString()
              const isCompareA = compareA?.timestamp === info?.timestamp
              const isCompareB = compareB?.timestamp === info?.timestamp
              return (
                <List.Item
                  key={item.cursor}
                  onClick={() => onClickListItem(item.node)}
                  extra={
                    viewMode === VIEW_MODE.COMPARE ? (
                      <Button
                        type={isCompareA || isCompareB ? 'primary' : 'dashed'}
                        icon={<CheckOutlined />}
                        children={isCompareA ? 'A' : isCompareB ? 'B' : ''}
                      />
                    ) : undefined
                  }
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
        </InfiniteScroll>
      </InfiniteScrollWrapper>
    </>
  )
}
export default UseQuery(ReportList)`
query GetReportInfos($taskType: TaskType, $stime: Float, $etime: Float, $after: Float) {
  getReportInfos(taskType: $taskType, stime: $stime, etime: $etime, first: 20, after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      cursor
      node {
        task {
          id
          name
        }
        timestamp
        data 
      }
    }
  }
}
`
