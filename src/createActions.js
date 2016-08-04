const createActions = (actions, dispatch) => {
  const dispatchedActions = {}

  for (const actionNode in actions) {
    if (!actions.hasOwnProperty(actionNode)) continue

    dispatchedActions[actionNode] = {}

    for (const methodName in actions[actionNode]) {
      if (!actions[actionNode].hasOwnProperty(methodName)) continue
      if (methodName == 'default') continue
      if (methodName == 'initialState') continue

      const type = `${actionNode}.${methodName}`

      // (dispatch) => (payload / opts) => ...
      const typedDispatch = (params) => dispatch({ type, params })
      
      // (payload / opts) => { dispatch / request }
      const action = actions[actionNode][methodName](typedDispatch)

      dispatchedActions[actionNode][methodName] = (...args) => action(...args)
    }
  }

  return dispatchedActions
}


export default createActions
