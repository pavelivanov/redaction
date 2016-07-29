const reducerAction = ({ actionNode }) => (state = {}, { meta, payload }) => {
  const newState = Object.assign({}, state)

  console.log('Dispatch reducer: ', meta, payload)
  console.log('Prev state: ', state)

  newState[actionNode] = meta.reduce(newState[actionNode], payload)

  console.log('New state: ', newState)

  return newState
}

export default reducerAction
