import callApi from './callApi'

export function login({ email, password }) {
  const data = { email, password }

  if (process.env.REACT_APP_LOGIN_EXPIRY) {
    data.expiry = process.env.REACT_APP_LOGIN_EXPIRY
  }

  return callApi('/login', data)
}

export default login
