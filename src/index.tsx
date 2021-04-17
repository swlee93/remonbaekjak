import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { ApolloProvider, MenuProvider, UserProvider } from 'contexts'

import App from 'components/App'

import 'index.css'

ReactDOM.render(
  <UserProvider>
    <ApolloProvider>
      <BrowserRouter>
        <MenuProvider>
          <App />
        </MenuProvider>
      </BrowserRouter>
    </ApolloProvider>
  </UserProvider>,
  document.getElementById('root'),
)
// serviceWorker.unregister()
