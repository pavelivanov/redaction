import { Map } from 'immutable'
import { createStore, combineReducers } from '../../../../../lib/immutable'
import reducers from '../reducers'


const initialState = Map({})

const store = createStore({
  reducers: {
    ...combineReducers(reducers),
  },
  initialState,
})


export default store
