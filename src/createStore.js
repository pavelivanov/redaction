import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'


const defaultMiddlewares = [
  thunk,
]

const defaultEnhancers = [

]


const devtools = typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : (v) => v


export default ({ reducer, initialState = {}, middlewares = [], enhancers = [] }) => {

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
    reducer,
    initialState,
    compose(
      applyMiddleware(...finalMiddlewares),
      ...finalEnhancers
    )
  )

  return store

}
