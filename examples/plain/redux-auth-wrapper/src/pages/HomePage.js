import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'


class HomePage extends Component {
  componentWillMount() {
    const { dispatch } = this.props

    setTimeout(() => {
      dispatch(push('/login'))
    }, 3000)
  }

  render() {
    return (
      <div>HomePage</div>
    )
  }
}

export default connect(
  () => ({}),
  dispatch => ({
    dispatch,
  })
)(HomePage)
