import { fromJS } from 'immutable'


export default (isImmutable) => (reducers, dispatch) => {
  const dispatchedReducers = {}

  for (let nodeName in reducers) {
    if (!reducers.hasOwnProperty(nodeName)) continue

    dispatchedReducers[nodeName] = {}

    for (let methodName in reducers[nodeName]) {
      if (!reducers[nodeName].hasOwnProperty(methodName)) continue
      if (methodName == 'default') continue
      if (methodName == 'initialState') continue

      const type = `${nodeName}.${methodName}`
      const dispatchedReducer = (payload) => dispatch({
        type,
        payload: isImmutable ? fromJS(payload) : payload,
      })

      dispatchedReducers[nodeName][methodName] = dispatchedReducer
      dispatchedReducers[nodeName][methodName].type = type
    }
  }

  return dispatchedReducers
}
