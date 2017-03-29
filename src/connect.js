import { connect } from 'react-redux'


const deepFind = (state, path) => state.getIn(path.split('.'))

// supports array of strings, strings with dot, or function
const lookup = (state, value, args) => {
  if (typeof value === 'function') return value(...args)
  if (typeof value === 'string') return deepFind(state, value)
  throw new Error(`Unknown lookup value: ${value}`)
}

// takes an object where key is anything you want
// and value (aka storeProp) is either
// - a dot delimited string
// - array of strings
// - function that returns an array of strings
// it will then dive into an immutable object and grab all of these storeProps
// and return the same object, but where the values are the resolved data
const resolve = (storeProps, state, ownProps) => {
  const resolved = {}
  for (let key in storeProps) {
    if (storeProps.hasOwnProperty(key)) {
      resolved[key] = lookup(state, storeProps[key], [state, ownProps])
    }
  }
  return resolved
}

const mapStateToProps = storeProps => (state, ownProps) =>
  resolve(storeProps, state, ownProps)

const defaults = {
  pure: true,
  withRef: false,
}


/**
 *
 * @param storeProps
 * @param props
 * @param options
 * @returns {function(*=)}
 */
export default (storeProps, props, options) => {
  const connector = connect(
    storeProps ? mapStateToProps(storeProps) : null,
    { ...defaults, ...options }
  )
  return (Component) => {
    Component.storeProps = storeProps
    return connector(Component)
  }
}
