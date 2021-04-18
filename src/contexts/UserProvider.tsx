import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'

import firebase from 'firebase/app'
import { MenuContext, MenuHandlerContext } from './MenuProvider'

enum SocialLogin {
  'GITHUB',
  'ANONYMOUS',
}

interface UserError {
  code: any
  message: any
  email: any
  credential: any
}

/**
 * UserContextProps
 */
interface UserContextProps {
  isLogin: boolean
}
const UserContext = createContext<UserContextProps>({ isLogin: false })

/**
 * UserHandlerProps
 */

interface UserHandlerProps {
  onLogin: (token: 'string') => void
  onSignUp: (token: 'string') => void
  onLogout: () => void
}
const UserHandlerContext = createContext<UserHandlerProps>({
  onLogin: () => {},
  onLogout: () => {},
  onSignUp: () => {},
})

interface UserProviderInterface {
  children: JSX.Element
}

export const AUTH_TOKEN = 'auth-token'

const UserProvider = ({ children }: UserProviderInterface) => {
  const { currentMenu } = useContext(MenuContext)
  const { onSelectMenu } = useContext(MenuHandlerContext)

  const [isLogin, setIsLogin] = useState<boolean>(!!localStorage.getItem(AUTH_TOKEN))

  const onSignUp = (token: string) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      setIsLogin(true)
      onSelectMenu({ uri: '/task' })
    }
  }

  const onLogin = (token: string) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      setIsLogin(true)
      onSelectMenu({ uri: '/task' })
    }
  }
  const onLogout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    setIsLogin(false)
    onSelectMenu({ uri: '/login' })
  }

  useEffect(() => {
    if (!isLogin) {
      onSelectMenu({ uri: '/login' })
    }
  }, [isLogin])

  return (
    <UserContext.Provider value={{ isLogin }}>
      <UserHandlerContext.Provider value={{ onLogin, onLogout, onSignUp }}>{children}</UserHandlerContext.Provider>
    </UserContext.Provider>
  )
}

export { UserContext, UserHandlerContext, SocialLogin }
export default UserProvider
