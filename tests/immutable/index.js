import { fromJS } from 'immutable'
import { createStore, connect, combineReducers } from '../../immutable'


const localReducers = {
  ui: {
    
  },
}

const store = createStore({
  reducers: {
    ...combineReducers(localReducers),
  },
  initialState: {
    me: {
      name: 'John Doe',
      stats: [
        { type: 'balance', value: 0 },
      ],
    },
  },
})


console.log(222, store)

describe('Immutable', () => {

  it('state, plain connect', () => {

  })

})
