import { applyMiddleware, compose, createStore as reduxCreateStore } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import thunk from 'redux-thunk'
import { Map, Iterable } from 'immutable'
import data from '../../lib/data'


const devTools = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (v) => v

const defaultMiddleware = [
  thunk,
]

const defaultEnhancers = []

const createStore = ({
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

  data.store = store

  return store
}


export default createStore
