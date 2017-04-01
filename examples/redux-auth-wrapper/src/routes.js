import React from 'react'
import { Route } from 'react-router'
import { push } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import App from './containers/App'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'


const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.get('user'), // how to get the user state
  redirectAction: push, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  failureRedirectPath: '/login',
  //predicate: user => user.loggedIn,
})

const routes = (
  <App>
    <Route path="/login" component={LoginPage} />
    <Route path="/home" component={UserIsAuthenticated(HomePage)} />
    <Route path="/home2" component={HomePage} />
  </App>
)

export default routes
