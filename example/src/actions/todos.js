import { createAction } from '../../../lib'


let nextTodoId = 0

export const initialState = {
  items: [],
  visibilityFilter: 'SHOW_ALL',
}

export const addItem = createAction((state, payload) => ({
  ...state,
  items: [
    ...state.items,
    {
      id: nextTodoId++,
      text: payload,
      completed: false
    }
  ]
}))

export const toggleItem = createAction((state, payload) => ({
  ...state,
  items: state.items.map((item) => {
    if (item.id !== payload) {
      return item
    }

    return {
      ...item,
      completed: !item.completed
    }
  })
}))

export const setVisibilityFilter = createAction((state, payload) => ({ ...state, visibilityFilter: payload }))
