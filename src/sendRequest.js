import request from 'superagent'


const createResponseHandler = ({ options, dispatch }) => {
  const debug = `${options.method.toUpperCase()} ${options.endpoint}`

  return (err, res) => {
    if (!res && !err) {
      err = new Error(`Connection failed: ${debug}`)
    }

    if (!err && !res.noContent && res.type !== 'application/json') {
      err = new Error(`Unknown response type: '${res.type}' from ${debug}`)
    }

    if (err) {
      dispatch({
        type: 'failure',
        payload: err,
        meta: options
      })

      if (typeof options.onError == 'function') {
        options.onError(err, res)
      }

      return
    }

    let result = res.body
    
    if (typeof options.modifyResponse == 'function') {
      result = options.modifyResponse(res, options.params) || res.body
    }

    dispatch({
      type: 'success',
      payload: result,
      meta: options
    })

    if (typeof options.onResponse == 'function') {
      options.onResponse(res)
    }
  }
}


const sendRequest = ({ options, dispatch }) => {
  dispatch({
    type: 'request',
    meta: options
  })

  const req = request[options.method.toLowerCase()](options.endpoint)

  if (options.headers) {
    req.set(options.headers)
  }

  if (options.query) {
    req.query(options.query)
  }

  if (options.body) {
    req.send(options.body)
  }

  if (options.withCredentials) {
    req.withCredentials()
  }

  // if (options.token) {
  //   req.set({ Authorization: `Bearer ${options.token}` })
  // }
  //
  // if (options.getToken) {
  //   const token = options.getToken(getState())
  //   if (token) {
  //     req.set({ Authorization: `Bearer ${token}` })
  //   }
  // }

  if (options.auth) {
    req.auth(...options.auth)
  }

  req.end(createResponseHandler({ options, dispatch }))
}

export default sendRequest
