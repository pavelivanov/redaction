import { wrapReducers } from '../../../lib/immutable'
import reducers from '../reducers'
import store from './store'


export default wrapReducers(reducers, store.dispatch)
