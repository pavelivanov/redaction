import type { Reducers } from './types'


type DispatchProps = {
  type: string
  rootType: string
  payload: any
}

type Dispatch = (props: DispatchProps) => void

type DispatchedMethod = (dispatch: Dispatch) => void

type DispatchedReducer = (payload: any) => void

type DispatchedReducers = {
  [key: string]: {
    [key: string]: DispatchedReducer
  }
}

type WaitList = DispatchedMethod[]


let savedDispatch: Dispatch
const waitList: WaitList = []

const wrapReducers = (reducers: Reducers, rootKey?: string) => {
  const dispatchedReducers: DispatchedReducers = {}

  for (let nodeName in reducers) {
    if (!reducers.hasOwnProperty(nodeName)) continue

    dispatchedReducers[nodeName] = {}

    for (let methodName in reducers[nodeName]) {
      if (!reducers[nodeName].hasOwnProperty(methodName)) continue
      if (methodName === 'default') continue
      if (methodName === 'initialState') continue

      const type = `${nodeName}.${methodName}`
      const rootType = `${rootKey ? `${rootKey}.` : ''}${type}`

      const dispatchedReducer = (payload: any) => {
        const method: DispatchedMethod = (dispatch: Dispatch) => dispatch({
          type,
          rootType,
          payload,
        })

        if (savedDispatch) {
          method(savedDispatch)
        }
        else {
          waitList.push(method)
        }
      }

      dispatchedReducers[nodeName][methodName] = dispatchedReducer
      // @ts-ignore
      dispatchedReducers[nodeName][methodName].type = type
    }
  }

  return dispatchedReducers
}

const resolveDispatch = (dispatch: Dispatch) => {
  while (waitList.length) {
    const action = waitList.shift() as DispatchedMethod

    action(dispatch)
  }

  savedDispatch = dispatch
}


export default wrapReducers

export {
  resolveDispatch,
}
