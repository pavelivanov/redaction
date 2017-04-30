import { connect } from '../../../../../lib/immutable'
import TodoList from '../components/TodoList'


const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.get('completed'))
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.get('completed'))
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const VisibleTodoList = connect({
  todos: state => getVisibleTodos(
    state.getIn(['todos', 'items']),
    state.getIn(['todos', 'visibilityFilter'])
  )
})(TodoList)

export default VisibleTodoList
