import { Table } from 'antd'
import { SortableContainer as SC, SortableElement as SE, SortableHandle as SH } from 'react-sortable-hoc'
import { MenuOutlined } from '@ant-design/icons'
import arrayMove from 'array-move'
import { useEffect, useState } from 'react'
import TaskListAction from './TaskListAction'

const DragHandle = SH(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />)

const columns = [
  // id,
  // description,
  // type,
  // name,
  // createdBy
  // createdAt
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
    title: 'Created By',
    dataIndex: 'createdBy',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: any) => <TaskListAction text={text} record={record} />,
  },
]

const SortableElement = SE((props: any) => <tr {...props} />)
const SortableContainer = SC((props: any) => <tbody {...props} />)

const TaskList = ({ data, loading, error }: any) => {
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

export default TaskList
