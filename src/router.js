import React from 'react'
import { routerRedux, Route, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'

const { ConnectedRouter } = routerRedux


const RouterConfig = app => ({ history }) => {
  const App = dynamic({
    app,
    models: () => [],
    component: () => import('./routes/Index'),
  })

  const About = dynamic({
    app,
    models: () => [],
    component: () => import('./routes/About'),
  })
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/about" component={About} />
      </Switch>
    </ConnectedRouter>
  )
}


export default RouterConfig
