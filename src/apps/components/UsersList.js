import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, LinkButton } from '../../components'

const StyledUsersList = styled.ul`
  list-style: none;
  max-width: 600px;
  margin: 0 auto;
  margin-bottom: 1.5em;
  padding: 0;
  font-size: 1.6rem;
`

const UserItem = styled.li`
  display: flex;
  flex-direction: row;
  margin-top: 1.4em;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UserAvatar = styled.img`
  width: 64px;
  height: 64px;
  background-color: var(--light-grey);
  border-radius: 50%;
  flex-shrink: 0;
`

const UserInfo = styled.div`
  flex-grow: 1;
  margin-left: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
`

const UserName = styled.h2`
  margin: 0;
  margin-bottom: 0.3em;
  font-size: 1.2em;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
`

function UsersListItem({ user }) {
  return (
    <UserItem>
      <UserAvatar src={user.avatar} alt={`${user.name}'s avatar'`} />
      <UserInfo>
        <UserName>{user.name}</UserName>
        <Link href={`mailto:${user.email}`}>{user.email}</Link>
      </UserInfo>
    </UserItem>
  )
}

const Title = styled.h1`
  text-align: left;
  font-size: 1.2em;
`

export class UsersList extends Component {
  render() {
    const { users, fetchMore, isFetching, allFetched } = this.props

    return (
      <article>
        <Title>People using this app</Title>
        <StyledUsersList>
          {users.map(user => (
            <UsersListItem key={user.id} user={user} />
          ))}
        </StyledUsersList>
        {isFetching && 'Loading more users 🚌'}
        {!(allFetched || isFetching) && (
          <LinkButton onClick={fetchMore}>Show more </LinkButton>
        )}
      </article>
    )
  }
}

export default UsersList
