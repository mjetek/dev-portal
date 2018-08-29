import { FetchError } from '../errors'

export async function callApi(path, data, accessToken, options = {}) {
  const method = options.method || (data != null ? 'POST' : 'GET')
  const headers =
    options.headers instanceof Headers
      ? options.headers
      : new Headers(options.headers)

  if (data != null && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  if (accessToken != null) {
    headers.set('Authorization', accessToken)
  }

  const response = await fetch(`${process.env.REACT_APP_API_URL}${path}`, {
    ...options,
    body: data && JSON.stringify(data),
    method,
    headers
  })

  const json = await response.json()

  if (!response.ok) {
    throw new FetchError(json, response)
  }

  return json
}

export default callApi
