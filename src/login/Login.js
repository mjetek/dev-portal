import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { LoginForm } from './components'
import { requestLogin } from './state/actions'
import { selectIsLoggingIn, selectLoginError, selectAccessToken } from './state'

function Login({
  location,
  isLoggedIn,
  requestLogin,
  isLoggingIn,
  loginError
}) {
  if (isLoggedIn) {
    const to = (location.state && location.state.from) || '/'
    return <Redirect to={to} />
  }
  return (
    <LoginForm
      login={requestLogin}
      isLoggingIn={isLoggingIn}
      loginError={loginError}
    />
  )
}

function mapStateToProps(state) {
  return {
    isLoggedIn: Boolean(selectAccessToken(state)),
    isLoggingIn: selectIsLoggingIn(state),
    loginError: selectLoginError(state)
  }
}

export default connect(
  mapStateToProps,
  { requestLogin }
)(Login)
