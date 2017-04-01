import React, { Component } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'


export default class Root extends Component {
  render() {
    const { children, store, history } = this.props

    return (
      <Provider store={store}>
        <Router history={history}>
          {children}
        </Router>
      </Provider>
    )
  }
}
