import { applyMiddleware, compose, createStore as reduxCreateStore } from 'redux'
import { Map, Iterable } from 'immutable'
import thunk from 'redux-thunk'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'


const devTools = typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (v) => v

const defaultMiddleware = [
  thunk,
]

const defaultEnhancers = [
  batchedSubscribe(batchedUpdates),
]

const createStore = (combineReducers) => ({
  initialState = Map(),
  reducers = {},
  middleware = [],
  enhancers = [],
}) => {
  if (!Iterable.isIterable(initialState)) {
    throw new Error('Invalid initialState option')
  }

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
