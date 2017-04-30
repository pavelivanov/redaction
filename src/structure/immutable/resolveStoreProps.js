const resolveStoreProps = (state, path) => state.getIn(path.split('.'))

export default resolveStoreProps
