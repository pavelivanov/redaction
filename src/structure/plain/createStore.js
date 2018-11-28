import { applyMiddleware, compose, combineReducers, createStore as reduxCreateStore } from 'redux'
import thunk from 'redux-thunk'
import data from '../../lib/data'


const devTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (v) => v

const defaultMiddleware = [
  thunk,
]

const defaultEnhancers = []

const createStore = ({
  initialState = {},
  reducers = {},
  middleware = [],
  enhancers = [],
}) => {
  const finalMiddleware = [
    ...defaultMiddleware,
    ...middleware,
  ]

  const finalEnhancers = [
    ...defaultEnhancers,
    ...enhancers,
    devTools,
  ]

  const store = reduxCreateStore(
    combineReducers(reducers),
    initialState,
    compose(
      applyMiddleware(...finalMiddleware),
      ...finalEnhancers,
    ),
  )

  data.store = store

  return store
}


export default createStore
