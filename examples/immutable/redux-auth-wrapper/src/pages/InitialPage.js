import React, { Component } from 'react'
import { Link } from 'react-router'


export default class HomePage extends Component {

  render() {
    return (
      <div>
        <div>
          <Link to="/login">Login page</Link>
        </div>
        <div>
          <Link to="/auth-required">Home page - auth required</Link>
        </div>
        <div>
          <Link to="/no-auth">Home page - no-auth</Link>
        </div>
      </div>
    )
  }
}
