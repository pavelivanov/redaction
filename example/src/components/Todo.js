import React, { PropTypes } from 'react'
import actions from '../core/actions'

const Todo = ({ id, completed, text }) => (
  <li
    onClick={() => actions.todos.toggleItem(id)}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
