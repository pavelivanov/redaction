import React from 'react'

import { connect } from '../../lib'


const App = () => (
  <div />
)


export default connect({
  me: 'me',
  myStats: 'me.stats',
})(App)
