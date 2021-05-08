import { Button, Space } from 'antd'
import Text from 'antd/lib/typography/Text'
import { CompareKey } from './ReportOptionProvider'

interface CompareButtonProps {
  compareKey: CompareKey
  compareValue: any
  onChangeCompare: Function
}

const CompareButton = ({ compareKey, compareValue, onChangeCompare }: CompareButtonProps) => {
  const onClick = (e: any) => {
    onChangeCompare(compareKey, undefined)
    e.stopPropagation()
  }
  const isSelected = !!compareValue?.timestamp
  return (
    <Button type={isSelected ? 'primary' : 'dashed'} onClick={onClick}>
      {isSelected ? (
        <Space>
          <Text type='secondary'>{compareKey}</Text>
          <Text>{new Date(compareValue.timestamp).toLocaleString()}</Text>
        </Space>
      ) : (
        compareKey
      )}
    </Button>
  )
}

export default CompareButton
