import { Map } from 'immutable'


export const initialState = Map({
  locale: 'en',
  modals: [
    { type: 'Dialog', isVisible: true },
    { type: 'Confirmation', isVisible: false },
  ],
})

export const setLocale = (state, payload) =>
  state.set('locale', payload)
