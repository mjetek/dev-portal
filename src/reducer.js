import { combineReducers } from 'redux'
import { reducer as loginReducer } from './login'
import { reducer as appsReducer } from './apps'
import { reducer as usersReducer } from './users'

export default combineReducers({
  login: loginReducer,
  apps: appsReducer,
  users: usersReducer
})
