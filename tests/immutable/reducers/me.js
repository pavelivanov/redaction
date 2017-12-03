import { fromJS } from 'immutable'


export const initialState = fromJS({
  name: 'John Doe',
  stats: [
    { type: 'reviews', value: 10 },
    { type: 'orders', value: 20 },
  ],
})

export const set = (state, payload) =>
  fromJS(payload)
