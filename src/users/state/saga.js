import { takeLatest, select, call, put, all } from 'redux-saga/effects'
import { REQUEST_APP_USERS, receiveAppUsers } from './actions'
import { fetchUsers as apiFetchUsers } from '../../api'
import { selectAccessToken } from '../../login'
import { selectUsersFetchedCount } from '../../apps'

function* fetchUsers(action) {
  const { appId } = action.payload
  try {
    const accessToken = yield select(selectAccessToken)
    const offset = yield select(selectUsersFetchedCount, appId)

    const response = yield call(apiFetchUsers, appId, offset, accessToken)
    yield put(receiveAppUsers(response, { appId }))
  } catch (error) {
    console.error(error)
    yield put(receiveAppUsers(error, { appId }))
  }
}

function* watchFetchUsers() {
  yield takeLatest(REQUEST_APP_USERS, fetchUsers)
}

export default function*() {
  yield all([watchFetchUsers()])
}
