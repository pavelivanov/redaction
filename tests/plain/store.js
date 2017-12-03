import { createStore, combineReducers } from '../../lib'
import localReducers from './reducers'


const store = createStore({
  reducers: combineReducers(localReducers),
  initialState: {},
})


export default store
