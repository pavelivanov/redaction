import { Map } from 'immutable'
import { createStore, combineReducers } from '../../../../../lib/immutable'
import reducers from '../reducers'

import { browserHistory } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'


const reduxCookieMiddleware = () => (next) => (action) => {
  const result = next(action)

  return result
}


const initialState = Map({})
const routingMiddleware = routerMiddleware(browserHistory)

const store = createStore({
  reducers: {
    ...combineReducers(reducers),
    routing: routerReducer,
  },
  middleware: [
    reduxCookieMiddleware,
    routingMiddleware,
  ],
  initialState,
})


export default store
