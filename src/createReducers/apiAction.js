const apiAction = (state = {}, { type, meta, payload }) => {
  if (meta.subset) {
    const newState = { ...state }

    if (!newState[meta.subset]) {
      newState[meta.subset] = {
        pending: false,
        data: null,
        error: null,
      }
    }

    if (type == 'request') {
      newState[meta.subset].pending = true
    }
    else if (type == 'success') {
      newState[meta.subset].data = payload
    }
    else if (type == 'failure') {
      newState[meta.subset].pending = false
      newState[meta.subset].error = payload
    }

    return newState
  }

  return state
}

export default apiAction
