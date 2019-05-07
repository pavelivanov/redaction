import React from 'react'
import PropTypes from 'prop-types'
import actions from '../actions'


const Todo = ({ todo }) => (
  <li
    onClick={() => actions.todos.toggleItem(todo.id)}
    style={{
      textDecoration: todo.completed ? 'line-through' : 'none'
    }}
  >
    {todo.text}
  </li>
)

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
}

export default Todo
