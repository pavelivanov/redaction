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
    }
  ]
})

export const toggleItem = (state, payload) => ({
  ...state,
  items: state.items.map((item) => {
    if (item.id !== payload) {
      return item
    }

    return {
      ...item,
      completed: !item.completed,
    }
  })
})

export const setVisibilityFilter = (state, payload) => ({
  ...state,
  visibilityFilter: payload,
})
