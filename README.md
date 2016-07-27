# Redux tool Box
Simple actions creator without string constants

## Usage

#### `actions/bottles.js`
```javascript
import { createAction } from 'redact'

export const getAll = createAction.request({
  endpoint: 'http://yoursite.com/api/bottles',
  method: 'GET'
})
```

#### `core/store.js`

```javascript
import { createStore, createReducer } from 'redact'
import actions from 'actions'


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
import { createActions } from 'redact'
import actions from 'actions'
import store from 'core/store'

export default createActions(actions, store.dispatch)
```

#### `components/Bottles.js`

```javascript
import actions from 'core/actions'

export default class Bottles extends React.Component {
  componentWillMount() {
    actions.bottles.getAll({
      subset: 'bottles',
      strategy: 'merge'
    })
  }
}
```

Store result after component will mount:

```json
{
  "bottles": {
    "pending": false,
    "data": [...Bottles],
    "error": null
  }
}
```
