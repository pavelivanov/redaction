<p>
  <img src="./images/redaction-logo-big.png" height="70" />
</p>

# Redaction

### Redux reducers without constants and dispatching

[![Npm Version](https://badge.fury.io/js/redaction.svg)](https://www.npmjs.com/package/redaction)
[![Month Downloads](https://img.shields.io/npm/dm/redaction.svg)](http://npm-stat.com/charts.html?package=redaction)
[![Npm Licence](https://img.shields.io/npm/l/redaction.svg)](https://www.npmjs.com/package/redaction)

---

## Deprecated — please use Redux Toolkit instead

**Redaction is no longer maintained.** This repository is preserved for historical reference only.

The problem Redaction set out to solve — eliminating boilerplate action constants and manual `dispatch()` calls — was later solved, correctly and with full TypeScript support, by [**Redux Toolkit** (`@reduxjs/toolkit`)](https://redux-toolkit.js.org/) via its `createSlice` API. Redux Toolkit is now the official, recommended way to write Redux logic.

If you are starting a new project, do **not** adopt Redaction. Pick one of the following based on what you actually need:

| If you need… | Use |
|---|---|
| Redux with minimal boilerplate | [**Redux Toolkit**](https://redux-toolkit.js.org/) (`@reduxjs/toolkit`) |
| Server state / data fetching | [**TanStack Query**](https://tanstack.com/query) or [**RTK Query**](https://redux-toolkit.js.org/rtk-query/overview) |
| Tiny client state, no Redux | [**Zustand**](https://github.com/pmndrs/zustand) |
| Atomic state model | [**Jotai**](https://jotai.org/) |
| Proxy-based state | [**Valtio**](https://valtio.dev/) |

If you are **already using Redaction** in an existing project, the final published version is `5.0.4`. It supports React 15 / 16 / 17 and `react-redux` 5 / 6 / 7 only. It will not work correctly with React 18+ concurrent rendering, and the README explicitly warns against using it with SSR. A migration to Redux Toolkit is straightforward because the mental model is nearly identical (see [Migration](#migration-to-redux-toolkit) below).

---

## Why this library existed

In 2016, idiomatic Redux meant writing, for every action:

1. A constant (`constants/todos.js`)
2. An action creator (`actions/todos.js`)
3. A `switch` case in a reducer (`reducers/todos.js`)
4. A `mapDispatchToProps` wiring in every connected component

Redaction collapsed all four into a single reducer method. The action type was auto-derived from the reducer's key path (`todos.addTodo`), and dispatch was handled implicitly by a module-level dispatcher captured at `createStore` time.

This was a genuinely novel idea at the time. Three years later, Redux Toolkit's `createSlice` shipped the same core insight — "the reducer *is* the action creator" — with proper TypeScript inference, Immer-backed immutability, and first-class SSR support, which Redaction was never able to provide.

---

## Historical overview

> The content below reflects how Redaction was used in 2019. It is preserved for readers maintaining legacy codebases that still depend on the library.

### Classic Redux approach (before Redaction)

##### `constants/todos.js`
```js
const ADD_TODO = 'ADD_TODO'

export {
  ADD_TODO
}
```

##### `reducers/todos.js`
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

##### `actions/todos.js`
```js
import { ADD_TODO } from 'constants/todos'

export const addTodo = (text) => (dispatch) => {
  dispatch({
    type: ADD_TODO,
    payload: text
  })
}
```

##### `App.js`
```js
import { connect } from 'react-redux'
import { addTodo } from 'actions/todos'

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

### Same example with Redaction

##### `reducers/todos.js`
```js
export const initialState = {
  todos: []
}

export const addTodo = (state, payload) => ({
  ...state,
  todos: [
    ...state.todos,
    payload,
  ],
})
```

##### `actions/todos.js`
```js
import { reducers } from 'core/reducers'

export const addTodo = (text) => {
  reducers.todos.addTodo(text)
}
```

##### `App.js`
```js
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
  todos: 'todos',
})(App)
```

No constants. No explicit dispatch. That was the pitch.

### Store wiring

##### `core/store.js`
```js
import { createStore, combineReducers } from 'redaction'
import reducers from 'reducers'

const store = createStore({
  reducers: {
    ...combineReducers(reducers),
  },
  initialState: {},
})

export default store
```

##### `core/reducers.js`
```js
import { wrapReducers } from 'redaction'
import reducers from 'reducers'

export default wrapReducers(reducers)
```

### `connect` variants

```js
import { connect } from 'redaction'

// 1. Classic react-redux style
connect(state => ({ todos: state.todos.list }))

// 2. Dotted-string path
connect({ todos: 'todos.list' })

// 3. Per-key selector functions
connect({ todos: (state) => state.todos.list })
```

---

## Migration to Redux Toolkit

The translation is almost mechanical. A Redaction reducer module:

```js
// reducers/todos.js  (Redaction)
export const initialState = { list: [] }

export const addTodo = (state, payload) => ({
  ...state,
  list: [...state.list, payload],
})
```

Becomes a Redux Toolkit slice:

```ts
// features/todos/todosSlice.ts  (Redux Toolkit)
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const todosSlice = createSlice({
  name: 'todos',
  initialState: { list: [] as string[] },
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.list.push(action.payload) // Immer handles immutability
    },
  },
})

export const { addTodo } = todosSlice.actions
export default todosSlice.reducer
```

And on the component side, replace `connect` with hooks:

```tsx
import { useSelector, useDispatch } from 'react-redux'
import { addTodo } from './features/todos/todosSlice'

const App = () => {
  const todos = useSelector((s: RootState) => s.todos.list)
  const dispatch = useDispatch()

  return (
    <div>
      {todos.map((text, i) => <div key={i}>{text}</div>)}
      <button onClick={() => dispatch(addTodo('new todo name'))}>Add</button>
    </div>
  )
}
```

You gain: full TypeScript inference, working SSR, React 18 concurrent-safe subscriptions, Immer-based reducer ergonomics, and an actively maintained library.

---

## Known limitations (why it was deprecated)

For anyone considering reviving Redaction or extracting ideas from it, these were the architectural dead-ends:

- **Module-level singleton dispatcher.** `wrapReducers.ts` stores `savedDispatch` in module scope. This makes SSR impossible (request state leaks across concurrent renders), breaks multi-store setups, and makes tests order-dependent.
- **No React 18 support.** `connect` is built on legacy `react-redux` internals and does not use `useSyncExternalStore`, so tearing under concurrent rendering is possible.
- **No hooks API.** The TODO at the bottom of the old README ("Support React hooks") was never addressed.
- **Weak types.** The public `Reducers` type is `{ [key: string]: any }`, so the ergonomic `reducers.todos.addTodo(payload)` call site accepts anything. `createSlice` infers `PayloadAction<T>` end-to-end.
- **Deprecated test stack.** Tests depend on Enzyme + `enzyme-adapter-react-16`, both abandoned.
- **Deprecated example ecosystem.** The `examples/` folder references `redux-form` and `redux-auth-wrapper`, both of which are themselves deprecated.

---

## Status

- **Last release:** `5.0.4`
- **Maintenance:** none
- **Peer deps:** React 15 / 16 / 17, `react-redux` 5 / 6 / 7, Redux 3 / 4
- **Issues & PRs:** the repository remains public for historical reference; new issues are unlikely to be addressed.

---

## License

ISC — see [LICENSE](./LICENSE).

## Author

Pavel Ivanov — [grammka@gmail.com](mailto:grammka@gmail.com)
