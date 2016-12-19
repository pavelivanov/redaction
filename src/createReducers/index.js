import apiAction from './apiAction'
import reducerAction from './reducerAction'


const createReducer = (actions) => {
  const reducers = {}

  for (let actionNode in actions) {
    if (!actions.hasOwnProperty(actionNode)) continue

    const initialState = 'initialState' in actions[actionNode] ? actions[actionNode].initialState : {}
    const nodeReducers = {}

    for (let methodName in actions[actionNode]) {
      if (!actions[actionNode].hasOwnProperty(methodName)) continue
      if (methodName == 'default') continue
      if (methodName == 'initialState') continue

      const action  = actions[actionNode][methodName]
      const type    = `${actionNode}.${methodName}`
      let reducer

      if (action.type == 'apiAction') {
        reducer = apiAction
      }
      else if (action.type == 'reducerAction') {
        reducer = reducerAction
      }

      nodeReducers[type] = reducer
    }

    reducers[actionNode] = (state = initialState, { type, params }) => {
      if (type in nodeReducers) {
        return nodeReducers[type](state, params)
      }

      return state
    }
  }

  return reducers
}

export default createReducer
