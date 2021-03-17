import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import Header from './Header'
import Home from './Home'
import LayoutBuilder from './LayoutBuilder'
import Navigation from './Navigation'
import Routes from './Routes'
import { MenuProvider } from 'contexts'

const App = () => (
  <MenuProvider>
    <LayoutBuilder Sider={<Navigation />} Content={<LayoutBuilder Header={<Header />} Content={<Routes />} />} />
  </MenuProvider>
)

export default App
