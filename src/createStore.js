import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'


const defaultMiddlewares = [
  thunk,
]

const defaultEnhancers = [

]


const devtools = typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (v) => v


export default ({ initialState = {}, reducers = {}, middlewares = [], enhancers = [] }) => {

  const finalMiddlewares = [
    ...defaultMiddlewares,
    ...middlewares
  ]

  const finalEnhancers = [
    ...defaultEnhancers,
    ...enhancers,
    devtools,
  ]

  const store = createStore(
    combineReducers(reducers),
    initialState,
    compose(
      applyMiddleware(...finalMiddlewares),
      ...finalEnhancers
    )
  )

  return store

}
