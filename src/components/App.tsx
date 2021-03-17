import React from 'react'
import Header from './Header'
import LayoutBuilder from './LayoutBuilder'
import Navigation from './Navigation'
import Routes from './Routes'

const App = () => <LayoutBuilder Header={<Header />} Sider={<Navigation />} Content={<Routes />} />

export default App
