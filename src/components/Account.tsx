import { MenuHandlerContext, SocialLogin, UserContext, UserHandlerContext } from 'contexts'
import React, { useContext, useEffect } from 'react'
import { Button } from 'antd'
import { MenuContext } from 'contexts'
import ButtonGroup from 'antd/lib/button/button-group'

const Account = () => {
  const { isLogin } = useContext(UserContext)
  const { onLogout } = useContext(UserHandlerContext)
  const { onSelectMenu } = useContext(MenuHandlerContext)
  const setMenu = (uri: string) => {
    onSelectMenu({ uri })
  }

  return (
    <>
      {isLogin ? <Button onClick={onLogout}>Logout</Button> : <Button onClick={() => setMenu('/login')}>Log In</Button>}
    </>
  )
}

export default Account
