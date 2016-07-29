const apiAction = ({ actionNode }) => (state = {}, { type, meta, payload }) => {
  const newState = JSON.parse(JSON.stringify(state))
  
  if (meta.subset) {
    console.log('Dispatch reducer: ', meta, payload)
    console.log('Prev state: ', state)

    if (!newState[actionNode]) {
      newState[actionNode] = {}
      newState[actionNode][meta.subset] = {
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

      if (!newState[actionNode][meta.subset]) {
        data = null
      }
    }
    else if (type == 'success') {
      pending = false
      error   = null

      data = newState[actionNode][meta.subset] && newState[actionNode][meta.subset].data

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
      newState[actionNode][meta.subset].pending = pending
    }

    if (typeof data != 'undefined') {
      newState[actionNode][meta.subset].data = data
    }

    if (typeof error != 'undefined') {
      newState[actionNode][meta.subset].error = error
    }

    console.log('New state: ', newState)

    return newState
  }
}

export default apiAction
