import { applyMiddleware, compose, createStore } from 'redux'
import { Map, Iterable } from 'immutable'
import thunk from 'redux-thunk'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'
import combineReducers from './combineReducers'


const devTools = typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (v) => v

const defaultMiddleware = [
  thunk,
]

const defaultEnhancers = [
  batchedSubscribe(batchedUpdates),
]


export default ({
  initialState = Map(),
  reducers = {},
  middleware = [],
  enhancers = []
}) => {
  if (!Iterable.isIterable(initialState)) {
    throw new Error('Invalid initialState option')
  }

  const finalMiddleware = [
    ...defaultMiddleware,
    ...middleware
  ]

  const finalEnhancers = [
    ...defaultEnhancers,
    ...enhancers,
    devTools,
  ]

  const store = createStore(
    combineReducers(reducers),
    initialState,
    compose(
      applyMiddleware(...finalMiddleware),
      ...finalEnhancers
    )
  )

  return store
}
