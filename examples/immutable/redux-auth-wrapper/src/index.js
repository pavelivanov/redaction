import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from './containers/Root'
import store from './core/store'
import routes from './routes'


const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: state => state.get('routing'),
})

render(
  <Root store={store} history={history}>
    {routes}
  </Root>,
  document.getElementById('root')
)
