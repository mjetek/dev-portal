import React, { Component } from 'react'
import styled from 'styled-components'
import { PrimaryButton, Input, Label, ErrorMessage } from '../../components'

const StyledForm = styled.form`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`

const LoginButton = styled(PrimaryButton)`
  width: 100%;
`

class LoginForm extends Component {
  handleSubmit = event => {
    event.preventDefault()
    const { email, password } = event.target

    const { login } = this.props
    login({ email: email.value, password: password.value })
  }

  render() {
    const { isLoggingIn, loginError } = this.props

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <fieldset>
          <h1>Login</h1>
          <div>
            <Label htmlFor="login-form__email">Email</Label>
            <Input
              type="email"
              placeholder="email@example.com"
              id="login-form__email"
              name="email"
              required
              autoFocus
            />
          </div>

          <div>
            <Label htmlFor="login-form__password">Password</Label>
            <Input
              type="password"
              placeholder="Password"
              id="login-form__password"
              name="password"
              required
            />
          </div>
          {loginError && <ErrorMessage>{loginError.message}</ErrorMessage>}
          <LoginButton type="submit" disabled={isLoggingIn}>
            Log in
          </LoginButton>
        </fieldset>
      </StyledForm>
    )
  }
}

export default LoginForm
