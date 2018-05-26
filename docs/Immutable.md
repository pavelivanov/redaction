## Usage

#### `actions/users.js`
```js
import reducers from 'core/reducers'

export const getAll = () => {
  fetch({
    endpoint: '/api/users',
    method: 'GET'
  })
    .then((result) => {
      reducers.users.put(result)
    })
}
```

#### `reducers/users.js`
```js
import { fromJS } from 'immutable'

export const initialState = fromJS({
  list: [],
})

export const put = (state, payload) => 
  state.update('list', list => list.push(payload))
```

#### `core/store.js`

```js
import { Map } from 'immutable'
import { createStore, combineReducers } from 'redaction/immutable'
import { reducer as form } from 'redux-form/immutable'
import reducers from 'reducers'

const initialState = Map({})

const store = createStore({
  reducers: {
    ...combineReducers(reducers),
    form,
  },
  initialState,
})

export default store
```

#### `core/reducers.js`

```js
import { wrapReducers } from 'redaction/immutable'
import reducers from 'reducers'

export default wrapReducers(reducers)
```

#### `components/Posts.js`

```js
import React from 'react'
import { users } from 'actions'

export default class Posts extends React.Component {
  componentWillMount() {
    users.getAll()
  }
}
```


## Features

#### Connect

There is sugar to connect state to components nifty:

```js
import React, { Component } from 'react'
import { connect } from 'redaction/immutable'

// option 1
@connect(state => ({
  todos: state.getIn(['todos', 'list']),
}))
// option 2
@connect({
  todos: 'todos.list',
})
// option 3
@connect({
  todos: (state) => state.getIn(['todos', 'list']),
})
export default class TodosList extends Component {}
```

#### PropTypes

For immutable use [react-immutable-proptypes](https://www.npmjs.com/package/react-immutable-proptypes)


## Examples

[Repo examples](https://github.com/pavelivanov/redaction/tree/master/examples/immutable)
