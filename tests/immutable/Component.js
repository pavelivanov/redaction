import React from 'react'

import { connect } from '../../lib/immutable'


const App = () => (
  <div />
)


export default connect({
  me: 'me',
  myStats: 'me.stats',
  avatar: 'me.avatar',
})(App)
