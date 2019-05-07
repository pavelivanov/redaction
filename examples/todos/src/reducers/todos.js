let nextTodoId = 0

export const initialState = {
  items: [],
  visibilityFilter: 'SHOW_ALL',
}

export const addItem = (state, payload) => ({
  ...state,
  items: [
    ...state.items,
    {
      id: nextTodoId++,
      text: payload,
      completed: false,
    },
  ],
})

export const toggleItem = (state, payload) => ({
  ...state,
  items: state.items.map((item) => {
    if (item.id === payload) {
      item.completed = !item.completed
    }
    return item
  })
})

export const setVisibilityFilter = (state, payload) => ({
  ...state,
  visibilityFilter: payload,
})
