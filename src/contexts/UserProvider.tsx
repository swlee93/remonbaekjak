import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'

import firebase from 'firebase/app'

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
  user: firebase.User | null
  error: UserError | null
}
const UserContext = createContext<UserContextProps>({ user: null, error: null })

/**
 * UserHandlerProps
 */
type LoginParams = SocialLogin | [email: string, password: string]
interface UserHandlerProps {
  onLogin?: (params: LoginParams) => void
  onLogout?: () => void
}
const UserHandlerContext = createContext<UserHandlerProps>({})

interface UserProviderInterface {
  children: JSX.Element
}
const UserProvider = ({ children }: UserProviderInterface) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [error, setError] = useState<UserError | null>(null)

  const onLogin = useCallback((...args) => {}, [])
  const onLogout = useCallback(() => {}, [])
  useEffect(() => {}, [])

  return (
    <UserContext.Provider value={{ user, error }}>
      <UserHandlerContext.Provider value={{ onLogin, onLogout }}>{children}</UserHandlerContext.Provider>
    </UserContext.Provider>
  )
}

export { UserContext, UserHandlerContext, SocialLogin }
export default UserProvider
