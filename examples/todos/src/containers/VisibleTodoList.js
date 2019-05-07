import { connect } from '../../../../../lib'
import TodoList from '../components/TodoList'


const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const VisibleTodoList = connect({
  todos: state => getVisibleTodos(
    state.todos.items,
    state.todos.visibilityFilter,
  )
})(TodoList)

export default VisibleTodoList
