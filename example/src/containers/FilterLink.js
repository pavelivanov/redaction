import { connect } from 'react-redux'
import actions from '../actions'
import Link from '../components/Link'


const mapStateToProps = (state, ownProps) => ({
  active: ownProps.filter === state.getIn(['todos', 'visibilityFilter'])
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => actions.todos.setVisibilityFilter(ownProps.filter)
})

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink
