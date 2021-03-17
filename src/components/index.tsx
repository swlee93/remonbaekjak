import React from 'react'
import Loadable from 'react-loadable'

export default (component: string) => {
  return Loadable.Map({
    loader: {
      Component: () => import(component),
    },
    loading: (props: any) => <>wait...</>,
    timeout: 5000,
    render(loaded: any, props: any) {
      const Component = loaded.Component.default
      return <Component {...props} />
    },
  })
}
