import { Map } from 'immutable'
import { reducer as form } from 'redux-form/immutable'
import { createStore, combineReducers } from '../../../../../lib/immutable'
import reducers from '../reducers'


const initialState = Map({})

const store = createStore({
  reducers: {
    ...combineReducers(reducers),
    form,
  },
  initialState,
})


export default store
