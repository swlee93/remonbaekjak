import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import LayoutBuilder from './LayoutBuilder'

import Navigation from './Navigation'

const App = () => (
  <LayoutBuilder
    Sider={<Navigation />}
    Content={
      <LayoutBuilder
        Header={<Header />}
        Content={
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        }
      />
    }
  />
)

export default App
