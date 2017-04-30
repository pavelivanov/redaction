export default (state, path) => state.getIn(path.split('.'))
