import React from 'react'
import { shallow } from 'enzyme'

import store from '../../plain/store'
import PlainComponent from '../../plain/Component'


describe('Plain Store', () => {

  it('plain connect', () => {

    const component = shallow(<PlainComponent />, {
      context: {
        store,
      },
    })

    const expected = {
      name: 'John Doe',
      stats: [
        { type: 'reviews', value: 10 },
        { type: 'orders', value: 20 },
      ],
    }

    expect(component.props().me).toEqual(expected)

  })

})
