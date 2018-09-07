import { handleActions } from 'redux-actions'
import { receiveAppUsers } from './actions'
import { combineReducers } from 'redux'

const byId = handleActions(
  {
    [receiveAppUsers]: {
      next: (state, action) => ({ ...state, ...action.payload.entities.users })
    }
  },
  {}
)

export default combineReducers({
  byId
})

export const selectUsersById = state => state.users.byId
