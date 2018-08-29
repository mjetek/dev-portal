import styled from 'styled-components'

export const Button = styled.button`
  border: none;
  padding: 0.5em 2em;
  margin: 1.5em 0;
  border-radius: 0.5em;
  font-size: 1.8rem;
  background: var(--light-grey);
  &:focus {
    outline: none;
    box-shadow: 0px 0px 20px 0px var(--accent-color);
  }
  &:disabled {
    opacity: 0.6;
  }
`

export const PrimaryButton = styled(Button)`
  color: white;
  background: var(--accent-color);
`

export const LinkButton = styled.button`
  background: none;
  border: none;
  font-size: 1em;
  cursor: pointer;
  color: var(--accent-color);
  text-transform: uppercase;
  padding: 0;
  &:focus {
    outline: solid 1px var(--accent-color);
  }
`
