import { useEffect, useMemo, useState } from 'react'
import { CheckOutlined, FileSearchOutlined } from '@ant-design/icons'
import { Button, List, Progress, Space, Statistic } from 'antd'

import { UseQuery, UseQueryProps } from 'utils/fetches'

import InfiniteScroll from 'react-infinite-scroller'
import { InfiniteScrollWrapper } from 'styles/LayoutStyles'
import { VIEW_MODE } from './ReportOptionProvider'
import Text from 'antd/lib/typography/Text'

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
  setOptions,
  refetch,
  stime,
  etime,
  viewMode,
  onClickListItem,
  compareA,
  compareB,
  error,
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
      <InfiniteScrollWrapper height={'100%'} hasNextPage={pageInfo.hasNextPage} errorMessage={error?.message}>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={handleInfiniteOnLoad}
          hasMore={!loading && pageInfo.hasNextPage}
          useWindow={false}
        >
          <List
            size='small'
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
                  actions={[<Button onClick={() => onClickListItem(item.node)} icon={<FileSearchOutlined />} />]}
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
                    title={<Progress percent={score} showInfo={false} />}
                    description={
                      <Space align='baseline'>
                        <Text>{Number(score.toFixed(2))}</Text>
                        <Text type='secondary'>{timestamp}</Text>
                      </Space>
                    }
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
query GetReportInfos($taskType: TaskType, $taskId: ID, $stime: Float, $etime: Float, $after: Float) {
  getReportInfos(taskType: $taskType, taskId: $taskId, stime: $stime, etime: $etime, first: 20, after: $after) {
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
