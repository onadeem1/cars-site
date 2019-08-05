/* global describe beforeEach afterEach it */

import { expect } from 'chai'
import { loadWishList } from '../store/admin'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = { admin: [] }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe.only('loadWishList', () => {
    it('eventually dispatches the GET LIST action', async () => {
      const fakeCars = [
        { make: 'nissan', model: 'altima' },
        { make: 'toyoya', model: 'camry' }
      ]
      mockAxios.onGet('/api/cars').replyOnce(200, fakeCars)
      await store.dispatch(loadWishList())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_LIST')
      expect(actions[0].cars).to.be.deep.equal(fakeCars)
    })
  })
})
