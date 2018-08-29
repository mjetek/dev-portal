import React, { Component } from 'react'
import { connect } from 'react-redux'
import { AppsList } from './components'
import { Async } from '../components'
import {
  selectApps,
  selectIsFetchingApps,
  selectAppsFetchingError
} from './state'
import { requestApps } from './state'

class Apps extends Component {
  componentDidMount() {
    this.props.requestApps()
  }

  render() {
    const { apps, isFetching, error } = this.props

    return (
      <article>
        <h1>Apps</h1>
        <Async
          isFetching={isFetching}
          error={error}
          renderFetching={() => <span>Loading apps</span>}
          renderError={() => <span>Ooops, couldn't load apps</span>}
        >
          <AppsList apps={apps} />
        </Async>
      </article>
    )
  }
}

function mapStateToProps(state) {
  return {
    apps: selectApps(state),
    isFetching: selectIsFetchingApps(state),
    error: selectAppsFetchingError(state)
  }
}

export default connect(
  mapStateToProps,
  { requestApps }
)(Apps)
