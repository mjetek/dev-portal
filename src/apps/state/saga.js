import {
  takeLatest,
  takeEvery,
  call,
  put,
  all,
  select
} from 'redux-saga/effects'
import {
  REQUEST_APPS,
  receiveApps,
  REQUEST_UPDATE_APP,
  receiveUpdateApp
} from './actions'
import { fetchApps as apiFetchApps, updateApp as apiUpdateApp } from '../../api'
import { selectAccessToken } from '../../login'

function* fetchApps(action) {
  try {
    const accessToken = yield select(selectAccessToken)

    const response = yield call(apiFetchApps, accessToken)
    yield put(receiveApps(response))
  } catch (error) {
    yield put(receiveApps(error))
  }
}

function* watchFetchApps() {
  yield takeLatest(REQUEST_APPS, fetchApps)
}

function* updateApp(action) {
  const { meta: { resolve, reject } = {} } = action
  try {
    const accessToken = yield select(selectAccessToken)

    const { id, name, logo } = action.payload
    const response = yield call(apiUpdateApp, { id, name, logo }, accessToken)
    resolve && resolve(response)
    yield put(receiveUpdateApp(response))
  } catch (error) {
    reject && reject(error)
    yield put(receiveUpdateApp(error))
  }
}

function* watchUpdateApp() {
  yield takeEvery(REQUEST_UPDATE_APP, updateApp)
}

export default function*() {
  yield all([watchFetchApps(), watchUpdateApp()])
}
