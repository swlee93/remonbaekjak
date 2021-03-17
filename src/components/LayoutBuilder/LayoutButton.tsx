import React from 'react'
import { Button } from 'antd'
import { LayoutFilled, MenuOutlined } from '@ant-design/icons'
interface LayoutButtonProps {
  onClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  children?: JSX.Element | string
  collapsed?: boolean
  hidden?: boolean
}
const LayoutButton = ({ onClick, children, collapsed, hidden }: LayoutButtonProps) => (
  <Button
    type='link'
    size='large'
    onClick={onClick}
    icon={collapsed ? <MenuOutlined /> : <LayoutFilled />}
    children={children}
    style={{ marginRight: 16, display: hidden === true ? 'none' : 'unset' }}
  />
)
export default LayoutButton
