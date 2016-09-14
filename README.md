<p>
  <img src="./images/redbox-small-logo.png" height="70" />
</p>

### Redux action creation made simple

[![Npm Version](https://badge.fury.io/js/redbox.svg)](https://www.npmjs.com/package/redbox)
[![Month Downloads](https://img.shields.io/npm/dm/redbox.svg)](http://npm-stat.com/charts.html?package=redbox)
[![Npm Licence](https://img.shields.io/npm/l/redbox.svg)](https://www.npmjs.com/package/redbox)

[![NPM](https://nodei.co/npm/redbox.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/redbox/)


## Overview

You still using ugly way of creation actions and reducers, don't you? Smth like this:

```javascript
const ADD_TODO = 'ADD_TODO'

export {
  ADD_TODO
}
```

```javascript
import { ADD_TODO } from 'constants'

export const addTODO = () => {
  return (dispatch) => {
    dispatch({
      type: ADD_TODO,
      item
    })
  }
}
```

```javascript
const ADD_TODO = 'ADD_TODO'

const initialState = {
  TODO: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_TODO':
      return {
        ...state,
        TODO: [
          ...state.TODO,
          action.TODO
        ]
      }

    default:
      return state
  }
}
```

#### Stop it !!!

Now, with **Redbox** you can do same like this:

```javascript
import { createAction } from 'redbox'

export const initialState = {
 TODO: []
}

export const addTODO = createAction((state, payload) => {
  return { ...state, TODO: { ...state.TODO, payload } }
})
```

#### That's it !!! Nifty !!!



## Attention

**Redbox** uses [**superagent**](https://visionmedia.github.io/superagent/) for API requests


## Install

```bash
npm install --save redbox
```


## Usage

```javascript
import { createAction, createActions, createStore, createReducers }
```

###`createAction(requestParams <Object> | reducer <Function>)`

To create request action pass params object as argument.
Returns an action for send requests with same argument, so that
you can override previously defined

Params available to use:

- `subset` - key where data will be stored
- `strategy` - what to do with data `merge | rewrite (defaults)`
- `endpoint`
- `method`
- `headers`
- `query`
- `body`
- `withCredentials`
- `auth`

Check [superagent docs](http://visionmedia.github.io/superagent/) for more information


```javascript
import { createAction } from 'redbox'

export const getPosts = createAction({
  endpoint: '/api/posts',
  method: 'GET',
  subset: 'posts'
})

// use it
getPosts({
  subset: 'userPosts'
})
```

Will execute dispatches:

- when request init will add `{ pending: true, data: null, error: null }` to store
- when request finished successfully will change it to `{ pending: false, data: response, error: null }`
- if request error will change it to `{ pending: false, data: null, error: responseError }`


To create simple reducer pass function as argument

```javascript
import { createAction } from 'redbox'

export const setLocale = createAction((state, payload) => {
  return { ...state, locale: payload }
})

// use it
setLocale('en')
```

####!!! Attention

If you want to pass `initialState` to store node just create it in same file
and export


```javascript
import { createAction } from 'redbox'

export const initialState = {
  locale: 'ru',
  //...
}

export const setLocale = createAction((state, payload) => {
  return { ...state, locale: payload }
})
```

---


###`createReducers(actions <Object>)`

Accepts all actions you create as argument and returns object of reducers
to use in `createStore`

```javascript
import { createReducers } from 'redbox'
import actions from 'my-actions'

export default createReducers(actions)
```

---


###`createStore({ initialState <Object>, reducers <Object>, middlewares <Array>, enhancers <Array> })`

Same as `redux` createStore method, accepts one object argument with keys
to pass `initialState`, `reducers`, `middlewares`, `enhancers`.
There is `redux-thunk` middleware and `window.devToolsExtension` enhancer inside

```javascript
import { createStore, createReducers } from 'redbox'
import reducers from 'created-reducers'

const initialState = {}

const store = createStore({ reducers, initialState })

export default store
```

---


###`createActions(actions <Object>, dispatch <Function>)`

Accepts all actions you create and dispatch from created store. Returns dispatched actions

```javascript
import { createActions } from 'redbox'
import actions from 'my-actions'
import store from 'created-store'

export default createActions(actions, store.dispatch)
```

---


## Example

#### `actions/posts.js`
```javascript
import { createAction } from 'redbox'

export const getAll = createAction.request({
  endpoint: '/api/posts',
  method: 'GET'
})
```

#### `actions/ui.js`
```javascript
import { createAction } from 'redbox'

export const initialState = {
  locale: 'en'
}

export const setLocale = createAction((state, payload) => {
  return { ...state, locale: payload }
})
```

#### `core/store.js`

```javascript
import { createStore, createReducer } from 'redbox'
import actions from 'my-actions'

const reducer = createReducer(actions)
const initialState = {}

const store = createStore({
  reducer,
  initialState
})

export default store
```

#### `core/actions.js`

```javascript
import { createActions } from 'redbox'
import actions from 'actions'
import store from 'core/store'

export default createActions(actions, store.dispatch)
```

#### `components/Posts.js`

```javascript
import React from 'react'
import actions from 'core/actions'

export default class Posts extends React.Component {
  componentWillMount() {
    actions.bottles.getAll({
      subset: 'list',
      strategy: 'merge'
    })

    actions.ui.setLocale('ru')
  }
}
```

Store content will be:

```json
{
  "posts": {
    "list": {
      "pending": false,
      "data": ["...Posts"],
      "error": null
    }
  },
  "ui": {
    "locale": "ru"
  }
}
```
