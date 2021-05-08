import React, { useContext } from 'react'
import { MenuContext } from 'contexts'
import { Route, Switch } from 'react-router'

import Home from 'components/Home'
import * as components from 'components'

const Routes = () => {
  const { menu } = useContext(MenuContext)
  if (!menu) return <></>
  return (
    <Switch>
      <Route exact path={'/'} component={Home} />
      {menu.map(({ uri, component: componentKey, name }) => {
        /**@ts-ignore */
        const Component: any = components[componentKey] || Home
        return <Route key={uri} exact path={uri} component={Component} />
      })}
    </Switch>
  )
}
export default Routes
