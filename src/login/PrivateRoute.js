import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectAccessToken } from './state'

function PrivateRoute({ isAuthenticated, ...props }) {
  return isAuthenticated ? (
    <Route {...props} />
  ) : (
    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )
}

function mapStateToProps(state) {
  return {
    isAuthenticated: Boolean(selectAccessToken(state))
  }
}

export default connect(mapStateToProps)(PrivateRoute)
