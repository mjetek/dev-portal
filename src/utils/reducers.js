import { handleActions } from 'redux-actions'

export const makeIsFetchingReducer = (requestAction, responseAction) =>
  handleActions(
    {
      [requestAction]: (_state, action) => true,
      [responseAction]: (_state, action) => false
    },
    false
  )

export const makeErrorReducer = (requestAction, responseAction) =>
  handleActions(
    {
      [requestAction]: (_state, action) => null,
      [responseAction]: {
        throw: (_state, action) => action.payload
      }
    },
    null
  )
