import { Space, Tag } from 'antd'
import Text from 'antd/lib/typography/Text'
interface TaggingProps {
  name: string
  value: string
}
const Tagging = ({ name, value }: TaggingProps) => {
  return (
    <Tag>
      <Space>
        <Text type='secondary'>{name}</Text>
        <Text>{value}</Text>
      </Space>
    </Tag>
  )
}
export default Tagging
