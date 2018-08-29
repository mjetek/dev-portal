import { combineActions, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { makeIsFetchingReducer, makeErrorReducer } from '../../utils/reducers'
import { REQUEST_LOGIN, RECEIVE_LOGIN, CLEAR_ACCESS_TOKEN } from './actions'

const initialValue = localStorage.getItem('accessToken')
const accessToken = handleActions(
  {
    [combineActions(REQUEST_LOGIN, CLEAR_ACCESS_TOKEN)]: (_state, action) =>
      null,
    [RECEIVE_LOGIN]: {
      next: (_state, action) => action.payload.accessToken,
      throw: (_state, action) => null
    }
  },
  initialValue
)

export default combineReducers({
  isLoggingIn: makeIsFetchingReducer(REQUEST_LOGIN, RECEIVE_LOGIN),
  error: makeErrorReducer(REQUEST_LOGIN, RECEIVE_LOGIN),
  accessToken
})

export const selectIsLoggingIn = state => state.login.isLoggingIn
export const selectLoginError = state => state.login.error
export const selectAccessToken = state => state.login.accessToken
