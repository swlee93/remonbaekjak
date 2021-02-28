import { createContext, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
}

interface FirebaseProviderInterface {
  children: JSX.Element
}

interface FirebaseInterface {
  instance: firebase.app.App | null
  auth: firebase.auth.Auth | null
}

export const FirebaseContext = createContext<FirebaseInterface>({ instance: null, auth: null })

const FirebaseProvider = ({ children }: FirebaseProviderInterface) => {
  const [value] = useState(() => {
    const instance = firebase.initializeApp(firebaseConfig)
    const auth = instance.auth()
    console.log('instance', instance)

    return {
      instance,
      auth,
    }
  })
  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>
}

export default FirebaseProvider
