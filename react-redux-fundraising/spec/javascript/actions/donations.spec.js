import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

// Write your import statement here

describe('getDonationsRequestSuccess action creator', () => {
  it('creates a GET_DONATIONS_REQUEST_SUCCESS action', () => {
    expect(true).toEqual(true)
  })
})

// Write additional tests here
