let config = {
  baseURL: null,
}

const configure = (options) => {
  if (options.baseURL && !/\/$/.test(options.baseURL)) {
    options.baseURL += '/'
  }

  config = {
    ...config,
    ...options,
  }
}


export default configure

export {
  config,
}
