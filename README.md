<p>
  <img src="./images/redaction-logo-big.png" height="70" />
</p>

### Redux reducers without constants and dispatching!

Redaction is wrapper for reducers. The main purpose is to refuse from using constants and dispatch method in code.
There are Plain and Immutable versions.

[![Npm Version](https://badge.fury.io/js/redaction.svg)](https://www.npmjs.com/package/redaction)
[![Month Downloads](https://img.shields.io/npm/dm/redaction.svg)](http://npm-stat.com/charts.html?package=redaction)
[![Npm Licence](https://img.shields.io/npm/l/redaction.svg)](https://www.npmjs.com/package/redaction)


## Install

```bash
npm install --save redaction
```


## Overview

In large projects usage of the standard Redux approach becomes a headache because of of the huge amount of constants and pushing the dispatch across the entire application logic. Redaction comes to help us solve these problems.

**Note:** Redaction is just wrapper over Redux, so it's not *reinventing the wheel*, it's **_sweet sugar_** :)

**BEWARE:** If you use / or planning to use SSR in your project **DON'T USE** Redaction! Currently there are some approaches inside which prevents from doing with SSR in easy way..

### Redux approach

`constants/todos.js`
```js
const ADD_TODO = 'ADD_TODO'

export {
  ADD_TODO
}
```

`reducers/todos.js`
```js
import { ADD_TODO } from 'constants/todos'

const initialState = {
  todos: []
}

export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload
        ]
      }

    default:
      return state
  }
}
```

`actions/todos.js`
```js
import { ADD_TODO } from 'constants/todos'

export const addTodo = (text) => (dispatch) => {
  dispatch({
    type: ADD_TODO,
    payload: text
  })
}
```

`App.js`
```js
import { connect } from 'react-redux'
import { addTODO } from 'actions/todos' 

const App = ({ todos, addTodo }) => (
  <div>
    {
      todos.map((text, index) => (
        <div key={index}>{text}</div>
      ))
    }
    <button onClick={() => addTodo('new todo name')}>Add</button>
  </div>
)

const mapStateToProps = (state) => ({
  todos: state.todos,
})

const mapDispatchToProps = (dispatch) => ({
  addTodo: (text) => {
    dispatch(addTodo(text))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
```

### Same with Redaction

`reducers/todos.js`
```js
export const initialState = {
 todos: []
}

export const addTodo = (state, payload) => ({ 
  ...state, 
  todos: [ 
    ...state.todos, 
    payload 
  ]
})
```

`actions/todos.js`
```js
import { reducers } from 'core/reducers' // read docs to understand what core folder means

export const addTodo = (text) => {
  reducers.todos.addTodo(text)
}
```

`App.js`
```
import actions from 'actions'
import { connect } from 'redaction' 

const App = ({ todos }) => (
  <div>
    {
      todos.map((text, index) => (
        <div key={index}>{text}</div>
      ))
    }
    <button onClick={() => actions.addTodo('new todo name')}>Add</button>
  </div>
)

export default connect({
  todos: 'todos'
})(App)
```

#### That's it! Nifty :) No constants! No dispatch!


## Documentation

- [Plain](https://github.com/pavelivanov/redaction/tree/master/docs/Plain.md)
- [Immutable](https://github.com/pavelivanov/redaction/tree/master/docs/Immutable.md)

## Notice

From 4.2.0 batches updates middleware was removed from the library. To use it check https://github.com/tappleby/redux-batched-subscribe


## TODO

- [x] Write tests
- [x] Add ImmutableJS
- [x] Add `connect` sugar with string paths
- [ ] Add actionWrapper to call dispatch `pending` and `error` requests in shadow
- [x] Test workflow with ReduxForm and ReduxSaga
