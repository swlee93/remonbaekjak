import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react'

import firebase from 'firebase/app'
import { MenuContext, MenuHandlerContext } from './MenuProvider'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { message } from 'antd'

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
interface AuthPayload {
  isLogin: boolean
  token: string | null
}
interface UserContextProps extends AuthPayload {
  user: {
    id: string
    email: string
    name: string
  } | null
}
const UserContext = createContext<UserContextProps>({ isLogin: false, token: null, user: null })

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
      email
      name
    }
  }
`

const UserProvider = ({ children }: UserProviderInterface) => {
  const { currentMenu } = useContext(MenuContext)
  const { onSelectMenu } = useContext(MenuHandlerContext)
  const [authPayload, setAuthPayload] = useState<AuthPayload>(() => {
    const token = localStorage.getItem(AUTH_TOKEN)
    return { isLogin: !!token, token }
  })

  const onSignUp = (token: string) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      setAuthPayload({ isLogin: true, token })
      onSelectMenu({ uri: '/monitors' })
    }
  }

  const onLogin = (token: string) => {
    if (token) {
      localStorage.setItem(AUTH_TOKEN, token)
      setAuthPayload({ isLogin: true, token })
      onSelectMenu({ uri: '/monitors' })
    }
  }
  const onLogout = () => {
    localStorage.removeItem(AUTH_TOKEN)
    setAuthPayload({ isLogin: false, token: '' })
    onSelectMenu({ uri: '/login' })
  }

  const [getUser, { data, error }] = useLazyQuery(GET_USER, { variables: { token: authPayload.token } })
  useEffect(() => {
    if (authPayload.isLogin) {
      getUser()
    } else {
      onSelectMenu({ uri: '/login' })
    }
  }, [authPayload])

  useEffect(() => {
    console.log('error?.message', error?.message)
    if (error?.message) {
      message.destroy()
      message.error(error?.message)
      onLogout()
    }
  }, [error])

  const user = useMemo(() => {
    if (authPayload?.isLogin) {
      return data?.getUser
    } else {
      return null
    }
  }, [data, authPayload?.isLogin])

  return (
    <UserContext.Provider value={{ ...authPayload, user }}>
      <UserHandlerContext.Provider value={{ onLogin, onLogout, onSignUp }}>{children}</UserHandlerContext.Provider>
    </UserContext.Provider>
  )
}

export { UserContext, UserHandlerContext, SocialLogin }
export default UserProvider
