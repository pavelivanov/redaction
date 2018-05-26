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
export const initialState = {
  list: [],
}

export const put = (state, payload) => ({
  ...state,
  list: [
    ...state.list,
    payload,
  ]
}) 
```

#### `core/store.js`

```js
import { createStore, combineReducers } from 'redaction'
import { reducer as form } from 'redux-form'
import reducers from 'reducers'

const initialState = {}

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
import { wrapReducers } from 'redaction'
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
import { connect } from 'redaction'

// option 1
@connect(state => ({
  todos: state.todos.list,
}))
// option 2
@connect({
  todos: 'todos.list',
})
// option 3
@connect({
  todos: (state) => state.todos.list,
})
export default class TodosList extends Component {}
```


## Examples

[Repo examples](https://github.com/pavelivanov/redaction/tree/master/examples/plain)
