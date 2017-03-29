import React from 'react'
import { PropTypes } from '../../../lib'
import Todo from './Todo'


const TodoList = ({ todos }) => (
  <ul>
    {
      todos.map(todo => (
        <Todo
          key={todo.get('id')}
          todo={todo}
        />
      ))
    }
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.listOf(PropTypes.contains({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default TodoList
