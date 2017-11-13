/* global __REACT_HOT_LOADER__ */
import dva from 'dva'
import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

if (module.hot && typeof __REACT_HOT_LOADER__ !== 'undefined') {
  __REACT_HOT_LOADER__.warnings = false
}

const app = dva(
  {
    history: createHistory(),
    initialState: {},
  },
)

window.app = app
app.router(require('./router').default(app))

app.use({
  onHmr: (render) => {
    if (module.hot) {
      (function () {
        const renderNormally = render

        const renderException = (error) => {
          const RedBox = require('redbox-react')

          ReactDOM.render(React.createElement(RedBox, {
            error,
          }), document.querySelector('#root'))
        }
        const newRender = (router) => {
          try {
            renderNormally(router)
          } catch (error) {
            renderException(error)
          }
        }
        module.hot.accept('./router', () => {
          const router = require('./router').default(app)
          newRender(router)
        })
      }())
    }
  },
})

app.start('#root')

registerServiceWorker()

