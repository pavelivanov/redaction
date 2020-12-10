import type { State, Reducers } from './types'


type CombinedReducers = {
  [key: string]: (state: State, action: { type: string, payload: any }) => State
}

const combineReducers = (reducers: Reducers) => {
  const combinedReducers: CombinedReducers = {}

  for (let nodeName in reducers) {
    if (!reducers.hasOwnProperty(nodeName)) continue

    const initialState = 'initialState' in reducers[nodeName] ? reducers[nodeName].initialState : {}
    const nodeReducers: Reducers = {}

    for (let methodName in reducers[nodeName]) {
      if (!reducers[nodeName].hasOwnProperty(methodName)) continue
      if (methodName === 'default') continue
      if (methodName === 'initialState') continue

      const reducer = reducers[nodeName][methodName]
      const type = `${nodeName}.${methodName}`

      nodeReducers[type] = reducer
    }

    combinedReducers[nodeName] = (state = initialState, { type, payload }) => {
      if (type in nodeReducers) {
        return nodeReducers[type](state, payload)
      }

      return state
    }
  }

  return combinedReducers
}


export default combineReducers
