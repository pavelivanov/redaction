import { createActions } from 'redaction'
import actions from '../actions'
import store from './store'


export default createActions(actions, store.dispatch)
