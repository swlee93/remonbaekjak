import { Badge, Space, Table, Tag, Tooltip } from 'antd'
import { SortableContainer as SC, SortableElement as SE, SortableHandle as SH } from 'react-sortable-hoc'
import { MenuOutlined } from '@ant-design/icons'
import arrayMove from 'array-move'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import TaskAction from './TaskAction'
import { UseQuery, UseQueryProps } from 'utils/fetches'
import { getAnyPropsToTagWithName, getTagsWithName } from './TaskMeta'
import moment from 'moment'
import { Tagging, Ellipsis } from 'components/DataDisplay'

const DragHandle = SH(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)

const SortableElement = SE((props: any) => <tr {...props} />)
const SortableContainer = SC((props: any) => <tbody {...props} />)
interface TaskListProps {
  refetchTrigger: null | number
}
const TaskList = ({
  data: _data_,
  loading,
  error,
  refetch,
  refetchTrigger,
  setRefetchTrigger,
}: UseQueryProps<TaskListProps>) => {
  const data = useMemo(() => _data_?.getTasks, [_data_])
  const [dataSource, setDataSource] = useState(data || [])
  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        className: 'drag-visible',
      },
      {
        title: 'Tags',
        key: 'tags',
        render: (_: any, record: any = {}) => {
          const { tags = [], ...rest } = record
          return (
            <>
              {getTagsWithName(tags).map(({ key, value, name }) => {
                return <Tagging key={key} name={name} value={value} />
              })}
              <Ellipsis>
                {getAnyPropsToTagWithName(rest).map(({ key, value, name }) => {
                  return <Tagging key={key} name={name} value={value} />
                })}
              </Ellipsis>
            </>
          )
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text: string, record: any) => {
          return <TaskAction record={record} setRefetchTrigger={setRefetchTrigger} />
        },
      },
    ]
  }, [])
  useEffect(() => {
    if (data) {
      setDataSource(data)
    }
  }, [data])
  const onSortEnd = ({ oldIndex, newIndex }: any) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el)

      setDataSource(newData)
    }
  }

  const DraggableContainer = (props: any) => (
    <SortableContainer useDragHandle disableAutoscroll helperClass='row-dragging' onSortEnd={onSortEnd} {...props} />
  )

  const DraggableBodyRow = ({ className, style, ...restProps }: any) => {
    const index = dataSource.findIndex((x: any) => x.id === restProps['data-row-key'])
    return <SortableElement index={index} {...restProps} />
  }

  useEffect(() => {
    console.log('refetchTrigger', refetchTrigger)
    if (refetchTrigger) {
      refetch()
    }
  }, [refetchTrigger])

  return (
    <Table
      size='small'
      style={{ width: '100%' }}
      loading={loading}
      pagination={false}
      dataSource={dataSource}
      columns={columns}
      rowKey='id'
      components={{
        body: {
          wrapper: DraggableContainer,
          row: DraggableBodyRow,
        },
      }}
    />
  )
}

export default UseQuery(TaskList)`
  query {
    getTasks {
      id
      type
      name
      description
      tags {
        key
        value
      }
      createdAt
    }
  }
`
