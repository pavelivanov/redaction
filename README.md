<p>
  <img src="./images/redaction-logo-big.png" height="70" />
</p>

### Redux reducers without constants and dispatching!

[![Npm Version](https://badge.fury.io/js/redaction.svg)](https://www.npmjs.com/package/redaction)
[![Month Downloads](https://img.shields.io/npm/dm/redaction.svg)](http://npm-stat.com/charts.html?package=redaction)
[![Npm Licence](https://img.shields.io/npm/l/redaction.svg)](https://www.npmjs.com/package/redaction)


## Install

```bash
npm install --save redaction
```


## Introduction

> The README reflects redaction v3.x, webpack v2.x [documentation can be found here](https://github.com/pavelivanov/redaction/tree/v2.2.0).

Redaction is wrapper for reducers. The main purpose is to refuse from using constants and dispatch method in code.
Inside uses Immutable.js


## Usage

#### `actions/users.js`
```js
import reducers from 'core/reducers'

export const getAll = () => {
  request({
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

export const put = (state, payload) => {
  return { ...state, list: payload }
}
```

#### `core/store.js`

```js
import { Map } from 'immutable'
import { createStore, combineReducers } from 'redaction'
import reducers from 'reducers'

const initialState = Map({})

const store = createStore({
  reducers,
  initialState,
})

export default store
```

#### `core/reducers.js`

```js
import { wrapReducers } from 'redaction'
import reducers from 'reducers'
import store from 'core/store'

export default wrapReducers(reducers, store.dispatch)
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

@connect({
  todos: 'todos.list',
})
export default class TodosList extends Component {}
```

#### PropTypes

```js
import React from 'react'
import { PropTypes } from 'redaction'

export default class TodosList extends Component {
  static propTypes = {
    todos: PropTypes.listOf(
      PropTypes.contains({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    )
  }
}
```


## Example

To run example check [this page](https://github.com/pavelivanov/redaction/tree/master/example)


## TODO

- [ ] Write tests
- [x] Add ImmutableJS
- [x] Add `connect` sugar with string paths
- [ ] Add actionWrapper to call dispatch `pending` and `error` requests in shadow
