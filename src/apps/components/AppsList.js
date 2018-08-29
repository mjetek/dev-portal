import React, { Component } from 'react'
import styled from 'styled-components'
import { RouterLink } from '../../components'
import AppLogo from './AppLogo'

const StyledAppsList = styled.ul`
  list-style: none;
  max-width: 600px;
  margin: 0 auto;
  padding: 0;
`

const AppItem = styled.li`
  display: flex;
  flex-direction: row;
  margin-top: 2em;
`

const AppInfo = styled.div`
  flex-grow: 1;
  margin-left: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
`

const AppName = styled.h2`
  margin-top: 0;
  a {
    color: inherit;
    &:hover {
      text-decoration: underline;
    }
  }
`

const AppCreatedDate = styled.time`
  font-style: italic;
  color: #888;
`

export class AppsList extends Component {
  static ListItem = function ListItem({ app }) {
    return (
      <AppItem>
        <AppLogo
          src={app.logo}
          alt={`Logo - ${app.name}`}
          width={100}
          height={100}
        />
        <AppInfo>
          <AppName>
            <RouterLink to={`/apps/${app.id}`}>{app.name}</RouterLink>
          </AppName>
          <AppCreatedDate>
            {new Date(app.created).toDateString()}
          </AppCreatedDate>
        </AppInfo>
      </AppItem>
    )
  }

  render() {
    const { apps } = this.props
    return (
      <StyledAppsList>
        {apps.map(app => (
          <AppsList.ListItem key={app.id} app={app} />
        ))}
      </StyledAppsList>
    )
  }
}

export default AppsList
