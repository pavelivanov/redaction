const apiAction = (state = {}, { type, meta, payload }) => {
  const newState = Object.assign({}, state)

  if (meta.subset) {
    console.log('Dispatch reducer: ', meta, payload)
    console.log('Prev state: ', state)

    if (!newState[meta.subset]) {
      newState[meta.subset] = {
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

      if (!newState[meta.subset]) {
        data = null
      }
    }
    else if (type == 'success') {
      pending = false
      error   = null

      data = newState[meta.subset] && newState[meta.subset].data

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
      newState[meta.subset].pending = pending
    }

    if (typeof data != 'undefined') {
      newState[meta.subset].data = data
    }

    if (typeof error != 'undefined') {
      newState[meta.subset].error = error
    }

    console.log('New state: ', newState)

    return newState
  }
}

export default apiAction
