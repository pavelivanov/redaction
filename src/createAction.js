import sendRequest from './sendRequest'
import merge from 'lodash.merge'


const createAction = (options = {}) => {
  const action = (dispatch) => (payload) => {
    dispatch({ meta: options, payload })
  }

  action.type = 'reducerAction'

  return action
}

createAction.request = (defaults = {}) => {
  const action = (dispatch) => (opts = {}) => {
    const options = merge(defaults, opts)

    sendRequest({ options, dispatch })
  }

  action.type = 'apiAction'

  return action
}


export default createAction
