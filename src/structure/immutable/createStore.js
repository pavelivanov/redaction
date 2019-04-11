import { applyMiddleware, compose, createStore as reduxCreateStore } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import { Map, Iterable } from 'immutable'
import { resolveDispatch } from '../../lib/wrapReducers'


const createStore = (props) => {
  const {
    initialState = Map(),
    reducers = {},
    middleware = [],
    enhancers = [],
  } = props

  if (!Iterable.isIterable(initialState)) {
    throw new Error('Invalid initialState option')
  }

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
