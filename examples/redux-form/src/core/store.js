import { reducer as form } from 'redux-form'
import { createStore, combineReducers } from '../../../../../lib'
import reducers from '../reducers'


const initialState = {}

const store = createStore({
  reducers: {
    ...combineReducers(reducers),
    form,
  },
  initialState,
})


export default store
