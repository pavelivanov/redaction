import { createStore, combineReducers } from '../../../lib'
import reducers from '../reducers'


const combinedReducers = combineReducers(reducers)
const initialState = {}

const store = createStore({
  reducers: combinedReducers,
  initialState
})


export default store
