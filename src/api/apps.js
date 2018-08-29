import callApi from './callApi'

export function fetchApps(accessToken) {
  return callApi('/apps', null, accessToken)
}

export function updateApp({ id, name, logo }, accessToken) {
  return callApi(`/apps/${id}`, { name, logo }, accessToken, { method: 'PUT' })
}
