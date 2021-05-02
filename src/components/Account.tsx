import { useContext } from 'react'
import { MenuHandlerContext, UserContext, UserHandlerContext } from 'contexts'
import { Button, Space } from 'antd'

import Avatar from 'antd/lib/avatar/avatar'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'

const Account = () => {
  const { isLogin, user } = useContext(UserContext)
  const { onLogout } = useContext(UserHandlerContext)
  const { onSelectMenu } = useContext(MenuHandlerContext)
  const setMenu = (uri: string) => {
    onSelectMenu({ uri })
  }

  return (
    <>
      {isLogin ? (
        <Space size='large'>
          <Avatar>{user?.name}</Avatar>
          <Button onClick={onLogout} icon={<LogoutOutlined />} />
        </Space>
      ) : (
        <Button onClick={() => setMenu('/login')} icon={<LoginOutlined />} />
      )}
    </>
  )
}

export default Account
