import { connect } from 'react-redux'


export default (resolveStoreProps, isConvertFromImmutable) => {

  // supports array of strings, strings with dot, or function
  const lookup = (state, ownProps, keyValue) => {
    if (typeof keyValue === 'function') return keyValue(state, ownProps)
    if (typeof keyValue === 'string') return resolveStoreProps(state, keyValue)
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
        let result = lookup(state, ownProps, storeProps[key])

        if (result && isConvertFromImmutable && typeof result.toJS === 'function') {
          result = result.toJS()
        }

        resolved[key] = result
      }
    }

    return resolved
  }

  const mapStateToProps = (storeProps, isConvertFromImmutable) => (state, ownProps) => {
    if (typeof storeProps === 'function') {
      return storeProps(state, ownProps)
    }

    return resolve(storeProps, state, ownProps)
  }

  const defaults = {
    pure: true,
    withRef: false,
  }

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
      () => ({}),
      null,
      { ...defaults, ...options }
    )

    return (Component) => {
      Component.storeProps = storeProps
      return connector(Component)
    }
  }
}
