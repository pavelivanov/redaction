import { Map, fromJS } from 'immutable'


let nextTodoId = 0

export const initialState = fromJS({
  items: [],
  visibilityFilter: 'SHOW_ALL',
})

export const addItem = (state, payload) =>
  state.update('items', (arr) => arr.push(Map({
    id: nextTodoId++,
    text: payload,
    completed: false,
  })))

export const toggleItem = (state, payload) =>
  state.update('items', (arr) => arr.update(
    arr.findIndex((item) => item.get('id') === payload),
    (item) => item.update('completed', (v) => !v)
  ))

export const setVisibilityFilter = (state, payload) =>
  state.set('visibilityFilter', payload)

