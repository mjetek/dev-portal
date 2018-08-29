import { createActions } from 'redux-actions'

export const REQUEST_LOGIN = 'REQUEST_LOGIN'
export const RECEIVE_LOGIN = 'RECEIVE_LOGIN'
export const CLEAR_ACCESS_TOKEN = 'CLEAR_ACCESS_TOKEN'

export const { requestLogin, receiveLogin, clearAccessToken } = createActions(
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  CLEAR_ACCESS_TOKEN
)
