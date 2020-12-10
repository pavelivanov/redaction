import { applyMiddleware, compose, combineReducers, createStore as reduxCreateStore } from 'redux'
import type { Middleware, StoreEnhancer } from 'redux'
import { resolveDispatch } from './wrapReducers'
import type { State, Reducers } from './types'


type Props = {
  initialState?: State
  reducers: Reducers
  middleware?: Middleware[]
  enhancers?: StoreEnhancer[]
}

const createStore = (props: Props) => {
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
