import { applyMiddleware, compose, createStore as reduxCreateStore } from 'redux'
import { combineReducers } from 'redux-immutablejs'
import { Map, Iterable } from 'immutable'
import data from '../../lib/data'


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

  data.store = store

  return store
}


export default createStore
