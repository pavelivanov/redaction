import { createStore, combineReducers as redactionCombineReducers, wrapReducers } from '../lib'


let store = null
let reducers = null


const initialState =  {
  page: {
    isFetching: false,
    filters: [],
    activeFilters: [],
  },
}

const localReducers = {
  page: {
    initialState: initialState.page,
    setFetching: (state, payload) => ({ ...state, isFetching: payload }),
    setFilters: (state, payload) => ({ ...state, filters: payload }),
    setActiveFilters: (state, payload) => ({ ...state, activeFilters: payload }),
    addActiveFilter: (state, value) => ({
      ...state,
      activeFilters: [ ...state.activeFilters, value ],
    }),
    removeActiveFilter: (state, value) => ({
      ...state,
      activeFilters: state.activeFilters.filter((item) => item !== value),
    }),
  }
}

const actions = {
  page: {
    addActiveFilter: (value) => reducers.page.addActiveFilter(value),
    fetchFilters: () => {
      reducers.page.setFetching(true)
      return new Promise((resolve) => {
        // emulate some fetching
        setTimeout(resolve, 100)
      }).then(() => {
        reducers.page.setFilters([ 'filter1', 'filter2', 'filter3' ])
        reducers.page.setFetching(false)
      })
    },
    removeDeletedFilters: () => {
      const state = store.getState()
      const { page: { filters, activeFilters } } = state

      activeFilters.map((value) => {
        if (!filters.includes(value)) {
          reducers.page.toggleActiveFilter(value)
        }
      })
    },
  }
}

store = createStore({
  reducers: {
    ...redactionCombineReducers(localReducers)
  },
  initialState: {},
})

reducers = wrapReducers(localReducers)


describe('check store getState()', () => {

  it('should return initial state', () => {
    const state = store.getState()
    expect(state).toEqual(initialState)
  })

  it('should return changed state after reducer call', () => {
    reducers.page.setFetching(true)

    const state = store.getState()
    expect(state.page.isFetching).toEqual(true)
  })

  it('should return changed state after action', (done) => {
    actions.page.addActiveFilter('filter1')

    actions.page.fetchFilters().then(() => {
      actions.page.removeDeletedFilters()

      const state = store.getState()

      expect(state).toEqual({
        page: {
          isFetching: false,
          filters: [ 'filter1', 'filter2', 'filter3' ],
          activeFilters: [ 'filter1' ],
        }
      })

      done()
    })
  })

})
