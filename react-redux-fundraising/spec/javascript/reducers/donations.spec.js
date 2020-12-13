// Write your import statement here

describe('donations reducer', () => {
  let initialState

  beforeAll(() => {
    initialState = {
      donationList: [],
      newName: '',
      newComment: '',
      newAmount: '',
      isFetching: false
    }
  })

  it('sets an initial state', () => {
    expect(true).toEqual(true)
  })

  // Write additional tests here

})
