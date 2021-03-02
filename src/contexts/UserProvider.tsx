import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { FirebaseContext } from 'contexts'
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
  const { auth } = useContext(FirebaseContext)
  const [user, setUser] = useState<firebase.User | null>(null)
  const [error, setError] = useState<UserError | null>(null)

  const onLogin = useCallback(
    (...args) => {
      if (!!auth) {
        switch (args.length) {
          case 2:
            const [email, password] = args
            auth.createUserWithEmailAndPassword(email, password)
            break
          case 1:
            const [social = SocialLogin.ANONYMOUS] = args
            let socialProvider
            switch (social) {
              case SocialLogin.GITHUB:
                socialProvider = new firebase.auth.GithubAuthProvider()
                auth.signInWithPopup(socialProvider)
                break
              case SocialLogin.ANONYMOUS:
              default:
                auth.signInAnonymously()
            }
        }
      }
    },
    [!!auth],
  )
  const onLogout = useCallback(() => {
    if (!!auth) {
      auth
        .signOut()
        .then(() => {
          onLogin(SocialLogin.ANONYMOUS)
        })
        .catch((error) => {
          setError(error)
        })
    }
  }, [!!auth])
  useEffect(() => {
    if (!!auth) {
      try {
        auth.onAuthStateChanged((usr) => {
          if (usr) {
            setUser(usr)
          } else {
            setUser(null)
          }
          if (error !== null) {
            setError(null)
          }
        })
      } catch (error) {
        console.error('firebase.onAuthStateChanged', error)
        setUser(null)
        setError(error)
      }
    }
  }, [!!auth])

  return (
    <UserContext.Provider value={{ user, error }}>
      <UserHandlerContext.Provider value={{ onLogin, onLogout }}>{children}</UserHandlerContext.Provider>
    </UserContext.Provider>
  )
}

export { UserContext, UserHandlerContext, SocialLogin }
export default UserProvider
