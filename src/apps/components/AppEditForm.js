import React, { Component } from 'react'
import styled from 'styled-components'
import { Input, Label, Button, PrimaryButton } from '../../components'

const Buttons = styled.div`
  text-align: end;

  & > * {
    margin-left: 0.5em;
  }
`

export class AppEditForm extends Component {
  handleSubmit = async event => {
    event.preventDefault()
    const { app, onSubmit, exitEditting } = this.props
    const { name, logo } = event.target
    try {
      await onSubmit({ id: app.id, name: name.value, logo: logo.value })
      exitEditting()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { app, exitEditting, isUpdating } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <fieldset disabled={isUpdating}>
          <div>
            <Label htmlFor="app-edit__name">App name</Label>
            <Input
              type="text"
              placeholder="App name"
              id="app-edit__name"
              name="name"
              required
              autoFocus
              defaultValue={app.name}
            />
          </div>
          <div>
            <Label htmlFor="app-edit__logo">Logo url</Label>
            <Input
              type="url"
              placeholder="https://example.com"
              id="app-edit__logo"
              name="logo"
              required
              defaultValue={app.logo}
            />
          </div>
          <Buttons>
            <PrimaryButton type="submit">Save</PrimaryButton>
            <Button type="button" onClick={exitEditting}>
              Cancel
            </Button>
          </Buttons>
        </fieldset>
      </form>
    )
  }
}

export default AppEditForm
