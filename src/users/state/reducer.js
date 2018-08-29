import { handleActions } from 'redux-actions'
import { RECEIVE_APP_USERS } from './actions'
import { combineReducers } from '../../../../../Library/Caches/typescript/3.0/node_modules/redux'

const byId = handleActions(
  {
    [RECEIVE_APP_USERS]: {
      next: (state, action) => ({ ...state, ...action.payload.entities.users })
    }
  },
  {}
)

export default combineReducers({
  byId
})

export const selectUsersById = state => state.users.byId
