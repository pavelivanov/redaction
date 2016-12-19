import { createActions } from '../../../lib'
import actions from '../actions'
import store from './store'


export default createActions(actions, store.dispatch)
