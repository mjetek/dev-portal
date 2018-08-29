import { takeLatest, call, put, all, take } from 'redux-saga/effects'
import {
  REQUEST_LOGIN,
  RECEIVE_LOGIN,
  receiveLogin,
  clearAccessToken
} from './actions'
import { login as apiLogin } from '../../api'

function* login(action) {
  const { email, password } = action.payload

  try {
    const response = yield call(apiLogin, { email, password })
    yield put(receiveLogin(response))
  } catch (error) {
    console.error(error)
    yield put(receiveLogin(error))
  }
}

function* loginWatch() {
  yield takeLatest(REQUEST_LOGIN, login)
}

const isUnauthorizedAction = action =>
  action.error && action.payload.statusCode === 401

function* watchForUnauthorized() {
  while (yield take(isUnauthorizedAction)) {
    yield put(clearAccessToken())
    yield take(RECEIVE_LOGIN)
  }
}

export default function*() {
  yield all([loginWatch(), watchForUnauthorized()])
}
