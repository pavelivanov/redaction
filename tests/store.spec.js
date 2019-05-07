import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { createStore, combineReducers, connect } from '../lib'


Enzyme.configure({ adapter: new Adapter() })


describe('store', () => {

  it('connect', () => {
    const reducers = {
      me: {
        initialState: {
          name: 'John Doe',
          avatar: null,
          stats: [
            { type: 'reviews', value: 10 },
            { type: 'orders', value: 20 },
          ],
        }
      },
      set: (state, payload) => payload,
    }

    const store = createStore({
      reducers: combineReducers(reducers),
      initialState: {},
    })

    const ComponentView = () => (
      <div />
    )

    const Component = connect({
      me: 'me',
      myStats: 'me.stats',
      avatar: 'me.avatar',
    })(ComponentView)

    const component = shallow(<Component store={store} />).dive()
    const props     = component.props()

    const expected = {
      name: 'John Doe',
      avatar: null,
      stats: [
        { type: 'reviews', value: 10 },
        { type: 'orders', value: 20 },
      ],
    }

    expect(props.me).toEqual(expected)
    expect(props.myStats).toEqual(expected.stats)
    expect(props.avatar).toEqual(expected.avatar)
  })

})
