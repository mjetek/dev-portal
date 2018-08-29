import callApi from './callApi'

export function fetchUsers(appId, offset, accessToken) {
  return callApi(`/apps/${appId}/users?offset=${offset}`, null, accessToken)
}
