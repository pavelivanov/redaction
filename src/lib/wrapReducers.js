import data from './data'


let dispatch
const waitList = []

const tryResolveWaitList = () => {
  if (!dispatch && data.store) {
    dispatch = data.store.dispatch

    waitList.forEach((action) => action(dispatch))
  }
}

(function resolveDispatch () {
  tryResolveWaitList()

  if (!dispatch) {
    setTimeout(() => {
      resolveDispatch()
    }, 100)
  }
})()


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
        const method = (dispatch) => dispatch({
          type,
          rootType,
          payload: fromJS ? fromJS(payload) : payload,
        })

        if (dispatch) {
          method(dispatch)
        }
        else {
          waitList.push(method)
        }
      }

      dispatchedReducers[nodeName][methodName] = dispatchedReducer
      dispatchedReducers[nodeName][methodName].type = type
    }
  }

  return dispatchedReducers
}
