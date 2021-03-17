import React from 'react'
import { Button } from 'antd'
import { LayoutOutlined } from '@ant-design/icons'
interface LayoutButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}
const LayoutButton = ({ onClick }: LayoutButtonProps) => (
  <Button type='link' size='large' onClick={onClick} icon={<LayoutOutlined />} />
)
export default LayoutButton
