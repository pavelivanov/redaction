import { applyMiddleware, compose, combineReducers, createStore as reduxCreateStore } from 'redux'
import { resolveDispatch } from '../../lib/wrapReducers'


const createStore = (props) => {
  const {
    initialState = {},
    reducers = {},
    middleware = [],
    enhancers = [],
  } = props

  const store = reduxCreateStore(
    combineReducers(reducers),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  )

  resolveDispatch(store.dispatch)

  return store
}


export default createStore
