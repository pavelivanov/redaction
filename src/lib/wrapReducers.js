const wrapReducers = (reducers, dispatch) => {
  const dispatchedReducers = {}

  for (let nodeName in reducers) {
    if (!reducers.hasOwnProperty(nodeName)) continue

    dispatchedReducers[nodeName] = {}

    for (let methodName in reducers[nodeName]) {
      if (!reducers[nodeName].hasOwnProperty(methodName)) continue
      if (methodName == 'default') continue
      if (methodName == 'initialState') continue

      const type = `${nodeName}.${methodName}`
      const dispatchedReducer = (payload) => dispatch({ type, payload })

      dispatchedReducers[nodeName][methodName] = dispatchedReducer
      dispatchedReducers[nodeName][methodName].type = type
    }
  }

  return dispatchedReducers
}

export default wrapReducers
