import { combineReducers } from 'redux'
import { handleActions, combineActions } from 'redux-actions'
import { createSelector } from 'reselect'
import { makeErrorReducer, makeIsFetchingReducer } from '../../utils/reducers'
import {
  requestApps,
  receiveApps,
  receiveUpdateApp,
  requestUpdateApp
} from './actions'
import {
  selectUsersById,
  requestAppUsers,
  receiveAppUsers
} from '../../users/state'

const PAGE_SIZE = 25

const ids = handleActions(
  {
    [receiveApps]: {
      next: (_state, action) => action.payload.result.apps
    }
  },
  []
)

const byId = handleActions(
  {
    [receiveApps]: {
      next: (_state, action) => action.payload.entities.apps
    },
    [receiveUpdateApp]: {
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
    [receiveApps]: {
      next: (_state, action) =>
        action.payload.result.apps.reduce((acc, id) => {
          acc[id] = false
          return acc
        }, {})
    },
    [requestUpdateApp]: (state, action) => ({
      ...state,
      [action.payload.id]: true
    }),
    [receiveUpdateApp]: (state, action) => ({
      ...state,
      [action.payload.result.app]: false
    })
  },
  {}
)

const appUser = handleActions(
  {
    [requestAppUsers]: (state, action) => ({ ...state, isFetching: true }),
    [receiveAppUsers]: {
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
    [receiveApps]: {
      next: (_state, action) =>
        action.payload.result.apps.reduce((acc, id) => {
          acc[id] = appUser(undefined, action)
          return acc
        }, {})
    },
    [combineActions(requestAppUsers, receiveAppUsers)]: (state, action) => {
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
  isFetching: makeIsFetchingReducer(requestApps, receiveApps),
  fetchError: makeErrorReducer(requestApps, receiveApps)
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
