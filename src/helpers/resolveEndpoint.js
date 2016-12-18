import { config } from './configure'


const resolveEndpoint = (endpoint) => {
  if (!config.baseURL || /^http|^\//.test(endpoint)) {
    return endpoint
  }
  else {
    return config.baseURL + endpoint
  }
}

export default resolveEndpoint
