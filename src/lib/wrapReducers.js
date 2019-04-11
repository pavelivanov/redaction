import data from './data'


const waitList = []

data.resolveWaitList = () => {
  waitList.forEach((action) => action())
}


export default (fromJS) => (reducers, rootKey) => {
  const dispatchedReducers = {}

  for (let nodeName in reducers) {
    if (!reducers.hasOwnProperty(nodeName)) continue

    dispatchedReducers[nodeName] = {}

    for (let methodName in reducers[nodeName]) {
      if (!reducers[nodeName].hasOwnProperty(methodName)) continue
      if (methodName === 'default') continue
      if (methodName === 'initialState') continue

      const type      = `${nodeName}.${methodName}`
      const rootType  = `${rootKey ? `${rootKey}.` : ''}${type}`

      const dispatchedReducer = (payload) => {
        const action = () => data.store.dispatch({
          type,
          rootType,
          payload: fromJS ? fromJS(payload) : payload,
        })

        if (data.store) {
          data.resolveWaitList()
          action()
        }
        else {
          waitList.push(action)
        }
      }

      dispatchedReducers[nodeName][methodName] = dispatchedReducer
      dispatchedReducers[nodeName][methodName].type = type
    }
  }

  return dispatchedReducers
}
