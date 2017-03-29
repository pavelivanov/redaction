import { connect } from 'react-redux'
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

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(
    state.getIn(['todos', 'items']),
    state.getIn(['todos', 'visibilityFilter'])
  )
})

const VisibleTodoList = connect(
  mapStateToProps
)(TodoList)

export default VisibleTodoList
