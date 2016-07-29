import apiAction from './apiAction'
import reducerAction from './reducerAction'


const createReducer = (actions) => {
  const reducers = {}

  for (let actionNode in actions) {
    if (!actions.hasOwnProperty(actionNode)) continue

    for (let methodName in actions[actionNode]) {
      if (!actions[actionNode].hasOwnProperty(methodName)) continue

      if (methodName == 'initialState') continue

      const action      = actions[actionNode][methodName]
      const reducerKey  = `${actionNode}.${methodName}`

      if (action.type == 'apiAction') {
        reducers[reducerKey] = apiAction({ actionNode })
      }
      else if (action.type == 'reducerAction') {
        reducers[reducerKey] = reducerAction({ actionNode })
      }
    }
  }

  return (state = {}, { type, params }) => {
    if (!(type in reducers)) {
      return state
    }

    return reducers[type](state, params)
  }
}


export default createReducer
