import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import AppLogo from './components/AppLogo'
import UsersList from './components/UsersList'
import { LinkButton } from '../components'
import { AppEditForm } from './components/AppEditForm'
import {
  selectApp,
  requestApps,
  updateApp,
  selectIsUpdating,
  selectAppUsers,
  selectAllUsersFetched,
  selectIsFetchingAppUsers
} from './state'
import { requestAppUsers } from '../users'

const AppName = styled.h1`
  text-align: start;
`

const EditWrapper = styled.div`
  margin-top: 1em;
`

class App extends Component {
  state = {
    editting: false
  }

  toggleEdit = () => this.setState(({ editting }) => ({ editting: !editting }))

  fetchMoreUsers = () => {
    const { requestAppUsers, match } = this.props
    const { id } = match.params
    requestAppUsers({ appId: id })
  }

  componentDidMount() {
    const { app, users, requestApps } = this.props

    if (app == null) {
      requestApps()
    }

    if (users.length === 0) {
      this.fetchMoreUsers()
    }
  }

  render() {
    const {
      state: { editting },
      props: {
        app,
        updateApp,
        isUpdating,
        users,
        isFetchingUsers,
        allUsersFetched
      }
    } = this

    if (app == null) {
      return null
    }

    return (
      <main>
        <AppName>{app.name}</AppName>
        <AppLogo
          src={app.logo}
          alt={`Logo - ${app.name}`}
          width={400}
          height={400}
        />
        <EditWrapper>
          {editting ? (
            <AppEditForm
              app={app}
              exitEditting={this.toggleEdit}
              isUpdating={isUpdating}
              onSubmit={updateApp}
            />
          ) : (
            <LinkButton onClick={this.toggleEdit}>Edit</LinkButton>
          )}
        </EditWrapper>
        <UsersList
          users={users}
          fetchMore={this.fetchMoreUsers}
          isFetching={isFetchingUsers}
          allFetched={allUsersFetched}
        />
      </main>
    )
  }
}

function mapStateToProps(state, props) {
  const { id } = props.match.params
  return {
    app: selectApp(state, id),
    isUpdating: selectIsUpdating(state, id),
    users: selectAppUsers(state, id),
    isFetchingUsers: selectIsFetchingAppUsers(state, id),
    allUsersFetched: selectAllUsersFetched(state, id)
  }
}

export default connect(
  mapStateToProps,
  { requestApps, requestAppUsers, updateApp }
)(App)
