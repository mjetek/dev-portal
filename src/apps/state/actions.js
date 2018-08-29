import { createActions } from 'redux-actions'
import { makeNormalizedPayload } from '../../utils/payloadCreators'
import { app as appSchema } from './schemas'

export const REQUEST_APPS = 'REQUEST_APPS'
export const RECEIVE_APPS = 'RECEIVE_APPS'
export const REQUEST_UPDATE_APP = 'REQUEST_UPDATE_APP'
export const RECEIVE_UPDATE_APP = 'RECEIVE_UPDATE_APP'

export const {
  requestApps,
  receiveApps,
  requestUpdateApp,
  receiveUpdateApp
} = createActions(
  {
    [RECEIVE_APPS]: makeNormalizedPayload({ apps: [appSchema] }),
    [RECEIVE_UPDATE_APP]: makeNormalizedPayload({ app: appSchema }),
    [REQUEST_UPDATE_APP]: [(payload, meta) => payload, (payload, meta) => meta]
  },
  REQUEST_APPS
)

export const updateApp = params => dispatch =>
  new Promise((resolve, reject) =>
    dispatch(requestUpdateApp(params, { resolve, reject }))
  )
