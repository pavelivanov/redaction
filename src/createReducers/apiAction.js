// TODO write test
/*

  apiAction({}, {
    status: 'request',
    meta: { subset: 'list' },
  })

  => { list: { pending: true, data: null, error: null } }


  apiAction({}, {
    status: 'success',
    meta: { subset: 'list' },
    payload: [ 'foo', 'bar' ],
  })

  => { list: { pending: false, data: [ 'foo', 'bar' ], error: null } }


  apiAction({}, {
    status: 'request',
    meta: { subset: 'list' },
  })

  => { list: { pending: true, data: [ 'foo', 'bar' ], error: null } }


  apiAction({}, {
    status: 'failure',
    meta: { subset: 'list' },
    payload: { message: 'something goes wrong' },
  })

  => { list: { pending: false, data: [ 'foo', 'bar' ], error: { message: 'something goes wrong' } } }

 */

const apiAction = (state = {}, { status, meta, payload }) => {
  if (meta.subset) {
    const newState = { ...state }

    if (!newState[meta.subset]) {
      newState[meta.subset] = {
        pending: false,
        data: null,
        error: null,
      }
    }

    if (status == 'request') {
      newState[meta.subset].pending = true
    }
    else if (status == 'success') {
      newState[meta.subset].data = payload
    }
    else if (status == 'failure') {
      newState[meta.subset].pending = false
      newState[meta.subset].error = payload
    }

    return newState
  }

  return state
}

export default apiAction
