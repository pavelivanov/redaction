import React from 'react'
import { Route } from 'react-router'
import { replace } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from './containers/App'
import InitialPage from './pages/InitialPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'


const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.get('user'), // how to get the user state
  redirectAction: replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  failureRedirectPath: '/login',
  //predicate: user => user.loggedIn,
})

const routes = (
  <App>
    <Route path="/" component={InitialPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/auth-required" component={UserIsAuthenticated(HomePage)} />
    <Route path="/no-auth" component={HomePage} />
  </App>
)

export default routes
