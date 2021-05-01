import { EllipsisOutlined, LeftOutlined, MoreOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd'
import Text from 'antd/lib/typography/Text'
import { useState } from 'react'
interface EllipsisProps {
  children: any
}
const Ellipsis = ({ children }: EllipsisProps) => {
  const [ellipsis, setEllipsis] = useState(true)
  return (
    <>
      <>{ellipsis ? null : children}</>
      <Button
        size='small'
        icon={ellipsis ? <EllipsisOutlined /> : <LeftOutlined />}
        type={ellipsis ? 'text' : 'link'}
        onClick={() => setEllipsis(!ellipsis)}
      />
    </>
  )
}

export default Ellipsis
