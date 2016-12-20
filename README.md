<p>
  <img src="./images/redaction-logo-big.png" height="70" />
</p>

### Redux action creation made simple

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


## Usage

#### `actions/users.js`
```javascript
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
```javascript
export const initialState = {
  list: [],
}

export const put = (state, payload) => {
  return { ...state, list: payload }
}
```

#### `core/store.js`

```javascript
import { createStore, combineReducers } from 'redaction'
import reducers from 'reducers'

const combinedReducers = combineReducers(actions)
const initialState = {}

const store = createStore({
  reducer: combinedReducers,
  initialState,
})

export default store
```

#### `core/reducers.js`

```javascript
import { wrapReducers } from 'redaction'
import reducers from 'reducers'
import store from 'core/store'

export default wrapReducers(reducers, store.dispatch)
```

#### `components/Posts.js`

```javascript
import React from 'react'
import { users } from 'actions'

export default class Posts extends React.Component {
  componentWillMount() {
    users.getAll()
  }
}
```


## Example

To run example check [this page](https://github.com/pavelivanov/redaction/tree/master/example)


## TODO

- [ ] Write tests
- [ ] Add ImmutableJS
- [ ] Add `connect` sugar with string paths
- [ ] Add actionWrapper to call dispatch `pending` and `error` requests in shadow
