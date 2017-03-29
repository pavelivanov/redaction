import { Map } from 'immutable'
import { combineReducers as immutableCombine } from 'redux-immutablejs'


const combineReducers = (reducers) => {
  const combinedReducers = {}

  for (let nodeName in reducers) {
    if (!reducers.hasOwnProperty(nodeName)) continue

    const initialState = 'initialState' in reducers[nodeName] ? reducers[nodeName].initialState : Map({})
    const nodeReducers = {}

    for (let methodName in reducers[nodeName]) {
      if (!reducers[nodeName].hasOwnProperty(methodName)) continue
      if (methodName == 'default') continue
      if (methodName == 'initialState') continue

      const reducer = reducers[nodeName][methodName]
      const type    = `${nodeName}.${methodName}`

      nodeReducers[type] = reducer
    }

    combinedReducers[nodeName] = (state = initialState, { type, payload }) => {
      if (type in nodeReducers) {
        return nodeReducers[type](state, payload)
      }

      return state
    }
  }

  return immutableCombine(combinedReducers)
}

export default combineReducers
