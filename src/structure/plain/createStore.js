import { applyMiddleware, compose, combineReducers, createStore as reduxCreateStore } from 'redux'
import thunk from 'redux-thunk'


const devTools = typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (v) => v

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

  return store
}


export default createStore
