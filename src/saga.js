import { all } from 'redux-saga/effects'
import { saga as loginSaga } from './login'
import { saga as appsSaga } from './apps'
import { saga as usersSaga } from './users'

export default function* saga() {
  yield all([loginSaga(), appsSaga(), usersSaga()])
}
