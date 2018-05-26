import data from './data'


let dispatch
const waitList = []

;(function resolveDispatch () {
  if (data.store) {
    dispatch = data.store.dispatch

    waitList.forEach((action) => action(dispatch))
  }
  else {
    setTimeout(() => {
      resolveDispatch()
    }, 100)
  }
})()


export default (fromJS) => (reducers) => {
  const dispatchedReducers = {}

  for (let nodeName in reducers) {
    if (!reducers.hasOwnProperty(nodeName)) continue

    dispatchedReducers[nodeName] = {}

    for (let methodName in reducers[nodeName]) {
      if (!reducers[nodeName].hasOwnProperty(methodName)) continue
      if (methodName === 'default') continue
      if (methodName === 'initialState') continue

      const type = `${nodeName}.${methodName}`
      const dispatchedReducer = (payload) => {
        const method = (dispatch) => dispatch({
          type,
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
