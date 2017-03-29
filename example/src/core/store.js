import { Map } from 'immutable'
import { createStore } from '../../../lib'
import reducers from '../reducers'


const initialState = Map({})

const store = createStore({
  reducers,
  initialState,
})


export default store
