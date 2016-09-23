import sendRequest from './sendRequest'
import merge from 'deepmerge'


const reserved = [
  'onError',
  'onResponse',
  'modifyResult',
]

const isReserved = (key) => reserved.indexOf(key) >= 0
const isFn = (key) => typeof key == 'function'

const mergeOptions = (defaults, opt) => {
  const options = merge(defaults, opt)

  for (const key in options) {
    if (!options.hasOwnProperty(key)) continue

    if (!isReserved(key) && isFn(options[key])) {
      options[key] = options[key](options.params || {})
    }
  }

  return options
}


const createRequestAction = (defaults = {}) => {
  const action = (dispatch) => (opts = {}) => {
    const options = mergeOptions(defaults, opts)

    sendRequest({ options, dispatch })
  }

  action.type = 'apiAction'

  return action
}

const createReducerAction = (reducer) => {
  const action = (dispatch) => (payload) => dispatch({ reducer, payload })

  action.type = 'reducerAction'

  return action
}


const createAction = (config) => {
  if (typeof config == 'object') {
    return createRequestAction(config)
  }
  else if (typeof config == 'function') {
    return createReducerAction(config)
  }
  else {
    throw Error('Redbox: Passed wrong config type to createAction')
  }
}


export default createAction
