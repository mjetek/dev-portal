import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import store from './store'
import { Login, PrivateRoute } from './login'
import { Apps, App } from './apps'
import { Main } from './components'

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main>
            <Switch>
              <Redirect from="/" exact to="/apps" />
              <Route path="/login" exact component={Login} />
              <PrivateRoute path="/apps" exact component={Apps} />
              <PrivateRoute path="/apps/:id" component={App} />
            </Switch>
          </Main>
        </Router>
      </Provider>
    )
  }
}

export default Root
