import { applyMiddleware, compose, combineReducers, createStore as reduxCreateStore } from 'redux'
import data from '../../lib/data'


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

  data.store = store

  return store
}


export default createStore
