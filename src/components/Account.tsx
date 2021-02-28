import { SocialLogin, UserContext, UserHandlerContext } from 'contexts'
import React, { useContext, useEffect } from 'react'
import { Button } from 'antd'

const Account = () => {
  const { user } = useContext(UserContext)
  const { onLogin, onLogout } = useContext(UserHandlerContext)
  const { isAnonymous } = user || {}

  useEffect(() => {
    if (!!onLogin && !user) {
      onLogin()
    }
  }, [!!onLogin])

  const onClickLogin = () => {
    if (onLogin) {
      onLogin(SocialLogin.GITHUB)
    }
  }

  const onClickLogout = () => {
    if (onLogout) {
      onLogout()
    }
  }
  return (
    <>
      {isAnonymous ? <Button onClick={onClickLogin}>GITHUB</Button> : <Button onClick={onClickLogout}>Logout</Button>}
    </>
  )
}

export default Account
