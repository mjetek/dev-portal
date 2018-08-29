import { handleActions, combineActions } from 'redux-actions'
import { createSelector } from 'reselect'
import { makeErrorReducer, makeIsFetchingReducer } from '../../utils/reducers'
import {
  REQUEST_APPS,
  RECEIVE_APPS,
  RECEIVE_UPDATE_APP,
  REQUEST_UPDATE_APP
} from './actions'
import {
  REQUEST_APP_USERS,
  RECEIVE_APP_USERS,
  selectUsersById
} from '../../users/state'

import { combineReducers } from '../../../../../Library/Caches/typescript/3.0/node_modules/redux'

const PAGE_SIZE = 25

const ids = handleActions(
  {
    [RECEIVE_APPS]: {
      next: (_state, action) => action.payload.result.apps
    }
  },
  []
)

const byId = handleActions(
  {
    [RECEIVE_APPS]: {
      next: (_state, action) => action.payload.entities.apps
    },
    [RECEIVE_UPDATE_APP]: {
      next: (state, action) => ({
        ...state,
        ...action.payload.entities.apps
      })
    }
  },
  {}
)

const updating = handleActions(
  {
    [RECEIVE_APPS]: {
      next: (_state, action) =>
        action.payload.result.apps.reduce((acc, id) => {
          acc[id] = false
          return acc
        }, {})
    },
    [REQUEST_UPDATE_APP]: (state, action) => ({
      ...state,
      [action.payload.id]: true
    }),
    [RECEIVE_UPDATE_APP]: (state, action) => ({
      ...state,
      [action.payload.result.app]: false
    })
  },
  {}
)

const appUser = handleActions(
  {
    [REQUEST_APP_USERS]: (state, action) => ({ ...state, isFetching: true }),
    [RECEIVE_APP_USERS]: {
      next: (state, action) => ({
        ...state,
        isFetching: false,
        ids: [...state.ids, ...action.payload.result.users],
        allFetched: action.payload.result.users.length < PAGE_SIZE
      }),
      throw: (state, action) => ({ ...state, isFetching: false })
    }
  },
  { isFetching: false, ids: [], allFetched: false }
)

const users = handleActions(
  {
    [RECEIVE_APPS]: {
      next: (_state, action) =>
        action.payload.result.apps.reduce((acc, id) => {
          acc[id] = appUser(undefined, action)
          return acc
        }, {})
    },
    [combineActions(REQUEST_APP_USERS, RECEIVE_APP_USERS)]: (state, action) => {
      const { appId } = action.payload
      return {
        ...state,
        [appId]: appUser(state[appId], action)
      }
    }
  },
  {}
)

export default combineReducers({
  ids,
  byId,
  updating,
  users,
  isFetching: makeIsFetchingReducer(REQUEST_APPS, RECEIVE_APPS),
  fetchError: makeErrorReducer(REQUEST_APPS, RECEIVE_APPS)
})

const selectAppsIds = state => state.apps.ids
const selectAppsById = state => state.apps.byId
export const selectIsFetchingApps = state => state.apps.isFetching
export const selectAppsFetchingError = state => state.apps.fetchError
export const selectIsUpdating = (state, id) => state.apps.updating[id]

export const selectApp = (state, id) => state.apps.byId[id]
export const selectApps = createSelector(
  selectAppsIds,
  selectAppsById,
  (ids, byId) => ids.map(id => byId[id])
)

const selectAppUsersIds = (state, id) =>
  (state.apps.users[id] && state.apps.users[id].ids) || []

export const selectAppUsers = createSelector(
  selectAppUsersIds,
  selectUsersById,
  (ids, byId) => ids.map(id => byId[id])
)

export const selectUsersFetchedCount = createSelector(
  selectAppUsersIds,
  ids => ids.length
)
export const selectAllUsersFetched = (state, id) =>
  (state.apps.users[id] && state.apps.users[id].allFetched) || false
export const selectIsFetchingAppUsers = (state, id) =>
  (state.apps.users[id] && state.apps.users[id].isFetching) || false
