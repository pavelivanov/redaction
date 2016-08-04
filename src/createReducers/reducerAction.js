const reducerAction = (state = {}, { reducer, payload }) => {
  return reducer(state, payload)
}

export default reducerAction
