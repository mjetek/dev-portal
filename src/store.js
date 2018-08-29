import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import saga from './saga'
import { selectAccessToken } from './login'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(reduxThunk, sagaMiddleware))
)

store.subscribe(() => {
  const accessToken = selectAccessToken(store.getState())
  localStorage.setItem('accessToken', accessToken)
})

sagaMiddleware.run(saga)

export default store
