import styled from 'styled-components'

const AppLogo = styled.img`
  border-radius: 0.5rem;
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height}px`}
  background-color: var(--light-grey);
  flex-shrink: 0;
`

export default AppLogo
