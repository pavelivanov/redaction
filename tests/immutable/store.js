import { Map } from 'immutable'

import { createStore, combineReducers } from '../../lib/immutable'
import localReducers from './reducers'


const store = createStore({
  reducers: combineReducers(localReducers),
  initialState: Map({}),
})


export default store
