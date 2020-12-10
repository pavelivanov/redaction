import { connect as reduxConnect } from 'react-redux'
import type { Options } from 'react-redux'
import resolveStoreProps from './resolveStoreProps'
import type { State } from './types'


type OwnProps = { [key: string]: any }

type Function = (state: State, ownProps: OwnProps) => void

type KeyValue = string | Function | any

type Resolved = { [key: string]: typeof lookup}

type StoreProps = { [key: string]: KeyValue }

// supports array of strings, strings with dot, or function
const lookup = (state: State, ownProps: OwnProps, keyValue: KeyValue) => {
  if (typeof keyValue === 'function') return keyValue(state, ownProps)
  if (typeof keyValue === 'string') return resolveStoreProps(state, keyValue)
  throw new Error(`Unknown lookup value: ${keyValue}`)
}

/*
 Takes an object where key is anything you want and value (aka storeProp) is either
 - a dot delimited string
 - array of strings
 - function that returns an array of strings
 Returns the same object, but where the values are the resolved data
 */
const resolve = (storeProps: StoreProps, state: State, ownProps: OwnProps) => {
  const resolved: Resolved = {}

  for (let key in storeProps) {
    if (storeProps.hasOwnProperty(key)) {
      resolved[key] = lookup(state, ownProps, storeProps[key])
    }
  }

  return resolved
}

const mapStateToProps = (storeProps: Function | StoreProps) => (state: State, ownProps: OwnProps) => {
  if (typeof storeProps === 'function') {
    return storeProps(state, ownProps)
  }

  return resolve(storeProps as Function, state, ownProps)
}

const defaults = {
  pure: true,
  withRef: false,
}

const connect = (storeProps: Function | StoreProps, options: Options) => {
  const isCorrectType = (
    !Array.isArray(storeProps)
    && [ 'string', 'object', 'function' ].indexOf(typeof storeProps) >= 0
  )

  if (!storeProps || !isCorrectType) {
    throw new Error('First argument must be type of String, Object or Function')
  }

  const connector = reduxConnect(
    mapStateToProps(storeProps),
    () => ({}),
    null,
    { ...defaults, ...options }
  )

  return (Component: any) => {
    Component.storeProps = storeProps
    return connector(Component)
  }
}


export default connect
