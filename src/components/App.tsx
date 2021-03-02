import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { AppContainer, AppContents } from 'styles/LayoutStyles'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'

const App = () => (
  <AppContainer>
    <Sidebar />
    <AppContents>
      <Header />
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </AppContents>
  </AppContainer>
)

export default App
