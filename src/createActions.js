const createActions = (actions, dispatch) => {
  const dispatchedActions = {}

  for (let actionNode in actions) {
    if (!actions.hasOwnProperty(actionNode)) continue

    dispatchedActions[actionNode] = {}

    for (let methodName in actions[actionNode]) {
      if (!actions[actionNode].hasOwnProperty(methodName)) continue

      const type            = `${actionNode}.${methodName}`
      const typedDispatch   = (payload) => dispatch({ type, payload })
      const action          = actions[actionNode][methodName](typedDispatch)

      dispatchedActions[actionNode][methodName] = (...args) => {
        return action(...args)
      }
    }
  }

  return dispatchedActions
}


export default createActions
