import { useContext } from 'react'
import { MenuHandlerContext, UserContext, UserHandlerContext } from 'contexts'
import { Button } from 'antd'
import { gql, useQuery } from '@apollo/client'

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
