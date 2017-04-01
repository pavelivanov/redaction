import { connect } from '../../../../lib'
import actions from '../actions'
import Link from '../components/Link'


const FilterLink = connect({
  active: (state, ownProps) => ownProps.filter === state.getIn(['todos', 'visibilityFilter']),
  onClick: (state, ownProps) => () => actions.todos.setVisibilityFilter(ownProps.filter),
})(Link)

export default FilterLink
