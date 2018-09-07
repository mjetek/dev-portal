import { combineActions, handleActions } from 'redux-actions'
import { combineReducers } from 'redux'
import { makeIsFetchingReducer, makeErrorReducer } from '../../utils/reducers'
import { receiveLogin, requestLogin, clearAccessToken } from './actions'

const initialValue = localStorage.getItem('accessToken')
const accessToken = handleActions(
  {
    [combineActions(requestLogin, clearAccessToken)]: (_state, action) => null,
    [receiveLogin]: {
      next: (_state, action) => action.payload.accessToken,
      throw: (_state, action) => null
    }
  },
  initialValue
)

export default combineReducers({
  isLoggingIn: makeIsFetchingReducer(requestLogin, receiveLogin),
  error: makeErrorReducer(requestLogin, receiveLogin),
  accessToken
})

export const selectIsLoggingIn = state => state.login.isLoggingIn
export const selectLoginError = state => state.login.error
export const selectAccessToken = state => state.login.accessToken
