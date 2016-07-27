import sendRequest from './sendRequest'
import merge from 'lodash.merge'


const createAction = (params) => {
  return (dispatch) => {
    console.log('simple action')
  }
}

createAction.request = (defaults = {}) => (dispatch) => (opts = {}) => {
  const options = merge(defaults, opts)

  return sendRequest({ options, dispatch })
}


export default createAction
