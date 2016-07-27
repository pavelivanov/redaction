const createReducer = (actions) => {
  const reducers = {}

  for (let actionNode in actions) {
    if (!actions.hasOwnProperty(actionNode)) continue

    for (let methodName in actions[actionNode]) {
      if (!actions[actionNode].hasOwnProperty(methodName)) continue

      const actionType = `${actionNode}.${methodName}`

      reducers[actionType] = (state = {}, { type, meta, payload }) => {
        if (meta.subset) {
          console.log('Dispatch reducer: ', meta, payload)
          console.log('Prev state: ', state)

          if (!state[actionNode]) {
            state[actionNode] = {}
            state[actionNode][meta.subset] = {
              pending: false,
              data: null,
              error: null
            }
          }

          let pending
          let data
          let error

          if (type == 'request') {
            pending = true
            error   = null

            if (!state[actionNode][meta.subset]) {
              data = null
            }
          }
          else if (type == 'success') {
            pending = false
            error   = null

            data = state[actionNode][meta.subset] && state[actionNode][meta.subset].data

            if (data) {
              if (meta.strategy == 'merge') {
                data = data.concat(payload)
              }
              else if (meta.strategy == 'rewrite') {
                data = payload
              }
            } else {
              data = payload
            }
          }
          else if (type == 'failure') {
            pending = false
            data    = null
            error   = payload
          }

          if (typeof pending != 'undefined') {
            state[actionNode][meta.subset].pending = pending
          }

          if (typeof data != 'undefined') {
            state[actionNode][meta.subset].data = data
          }

          if (typeof error != 'undefined') {
            state[actionNode][meta.subset].error = error
          }

          console.log('New state: ', state)

          return state
        }
      }
    }
  }

  return (state = {}, { type, payload }) => {
    if (!(type in reducers)) {
      return state
    }

    return reducers[type](state, payload)
  }
}


export default createReducer
