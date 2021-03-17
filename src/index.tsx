import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider, FirebaseProvider, MenuProvider, UserProvider } from 'contexts'

import App from 'components/App'

import 'index.css'

ReactDOM.render(
  <FirebaseProvider>
    <UserProvider>
      <ApolloProvider>
        <BrowserRouter>
          <MenuProvider>
            <App />
          </MenuProvider>
        </BrowserRouter>
      </ApolloProvider>
    </UserProvider>
  </FirebaseProvider>,
  document.getElementById('root'),
)
// serviceWorker.unregister()
