import { connect } from 'react-redux'
import { Map } from 'immutable'


let _resolveStoreProps

// supports array of strings, strings with dot, or function
const lookup = (state, ownProps, keyValue) => {
  if (typeof keyValue === 'function') return keyValue(state, ownProps)
  if (typeof keyValue === 'string') return _resolveStoreProps(state, keyValue)
  throw new Error(`Unknown lookup value: ${keyValue}`)
}

/*
 Takes an object where key is anything you want and value (aka storeProp) is either
 - a dot delimited string
 - array of strings
 - function that returns an array of strings
 It will then dive into an immutable object and grab all of these storeProps
 Returns the same object, but where the values are the resolved data
*/
const resolve = (storeProps, state, ownProps) => {
  const resolved = {}

  for (let key in storeProps) {
    if (storeProps.hasOwnProperty(key)) {
      resolved[key] = lookup(state, ownProps, storeProps[key])
    }
  }

  return resolved
}

const mapStateToProps = (storeProps, isConvertFromImmutable) => (state, ownProps) => {
  let _state = state

  if (isConvertFromImmutable && state instanceof Map) {
    _state = state.toJS()
  }

  if (typeof storeProps === 'function') {
    return storeProps(_state, ownProps)
  }

  return resolve(storeProps, _state, ownProps)
}

const defaults = {
  pure: true,
  withRef: false,
}


export default (resolveStoreProps, isConvertFromImmutable) => {
  _resolveStoreProps = resolveStoreProps

  return (storeProps, options) => {
    const isCorrectType = (
      !Array.isArray(storeProps)
      && [ 'string', 'object', 'function' ].indexOf(typeof storeProps) >= 0
    )

    if (!storeProps || !isCorrectType) {
      throw new Error('First argument must be type of String, Object or Function')
    }

    const connector = connect(
      mapStateToProps(storeProps, isConvertFromImmutable),
      dispatch => ({
        dispatch,
      }),
      null,
      { ...defaults, ...options }
    )

    return (Component) => {
      Component.storeProps = storeProps
      return connector(Component)
    }
  }
}
