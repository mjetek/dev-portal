import React, { Component } from 'react'
import styled from 'styled-components'

class InputBase extends Component {
  state = { visited: false }

  handleBlur = (...args) => {
    this.setState({ visited: true })
    if (typeof this.props.handleBlur === 'function') {
      this.props.handleBlur(...args)
    }
  }

  render() {
    return (
      <input
        data-visited={this.state.visited}
        {...this.props}
        onBlur={this.handleBlur}
      />
    )
  }
}

export const Input = styled(InputBase)`
  width: 100%;
  padding: 0.5em 0.8em;
  border: solid 1px var(--light-grey);
  border-radius: 0.3rem;
  background: var(--light-grey);
  font-size: 1.6rem;
  outline: none;
  transition: border-color 0.4s;
  &:focus {
    outline: none;
    border-color: var(--accent-color);
  }
  &[data-visited='true']:invalid {
    border-color: red;
  }
`

export default Input
