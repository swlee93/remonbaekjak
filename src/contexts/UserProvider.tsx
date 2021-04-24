import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'

import firebase from 'firebase/app'
import { MenuContext, MenuHandlerContext } from './MenuProvider'
import { gql, useLazyQuery, useQuery } from '@apollo/client'

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
  token: string | null
}
const UserContext = createContext<UserContextProps>({ isLogin: false, token: null })

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

const GET_USER = gql`
  query GetUser($token: String) {
    getUser(token: $token) {
      id
    }
  }
`

const UserProvider = ({ children }: UserProviderInterface) => {
  const { currentMenu } = useContext(MenuContext)
  const { onSelectMenu } = useContext(MenuHandlerContext)
  const [token, setToken] = useState(localStorage.getItem(AUTH_TOKEN))
  const [isLogin, setIsLogin] = useState<boolean>(!!token)

  const onSignUp = (token: string) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      setIsLogin(true)
      setToken(token)
      onSelectMenu({ uri: '/task' })
    }
  }

  const onLogin = (token: string) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      setIsLogin(true)
      setToken(token)
      onSelectMenu({ uri: '/task' })
    }
  }
  const onLogout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    setIsLogin(false)
    setToken('')
    onSelectMenu({ uri: '/login' })
  }

  useEffect(() => {
    if (isLogin) {
    } else {
      onSelectMenu({ uri: '/login' })
    }
  }, [isLogin, token])

  const { data } = useQuery(GET_USER, { variables: { token } })
  console.log('data', data, token)
  return (
    <UserContext.Provider value={{ isLogin, token }}>
      <UserHandlerContext.Provider value={{ onLogin, onLogout, onSignUp }}>{children}</UserHandlerContext.Provider>
    </UserContext.Provider>
  )
}

export { UserContext, UserHandlerContext, SocialLogin }
export default UserProvider
