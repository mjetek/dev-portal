import styled from 'styled-components'
import { Link as RRLink } from 'react-router-dom'

export const Link = styled.a`
  text-decoration: none;
  color: var(--accent-color);
  &:focus {
    outline: solid 1px var(--accent-color);
  }
`

export const RouterLink = Link.withComponent(RRLink)

export default Link
