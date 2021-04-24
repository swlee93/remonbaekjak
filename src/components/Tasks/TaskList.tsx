import { Table } from 'antd'
import { SortableContainer as SC, SortableElement as SE, SortableHandle as SH } from 'react-sortable-hoc'
import { MenuOutlined } from '@ant-design/icons'
import arrayMove from 'array-move'
import { useEffect, useMemo, useState } from 'react'
import TaskListAction from './TaskListAction'
import { UseQuery, UseQueryProps } from 'utils/fetches'

const DragHandle = SH(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)

const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    className: 'drag-visible',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => <TaskListAction record={record} />,
  },
]

const SortableElement = SE((props: any) => <tr {...props} />)
const SortableContainer = SC((props: any) => <tbody {...props} />)
interface TaskListProps {
  refetchTrigger: null | number
}
const TaskList = ({ data: _data_, loading, error, refetch, refetchTrigger }: UseQueryProps<TaskListProps>) => {
  const data = useMemo(() => _data_?.getTasks, [_data_])
  const [dataSource, setDataSource] = useState(data || [])

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
      description
      type
      name
      user {
        name
        email
      }
      createdAt
    }
  }
`
