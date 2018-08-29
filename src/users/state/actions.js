import { createActions } from 'redux-actions'
import { makeNormalizedPayload } from '../../utils/payloadCreators'
import { user as userSchema } from './schemas'

export const REQUEST_APP_USERS = 'REQUEST_APP_USERS'
export const RECEIVE_APP_USERS = 'RECEIVE_APP_USERS'

export const { requestAppUsers, receiveAppUsers } = createActions(
  {
    [RECEIVE_APP_USERS]: makeNormalizedPayload({ users: [userSchema] })
  },
  REQUEST_APP_USERS
)
