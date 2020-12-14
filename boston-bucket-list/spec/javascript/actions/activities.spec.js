import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

import {
  getActivities,
  getActivitiesRequestSuccess,
  GET_ACTIVITIES_REQUEST_SUCCESS,
  patchActivity,
  updateActivityStatus,
  UPDATE_ACTIVITY_STATUS
} from '../../../app/javascript/react/modules/activities.js'

describe('getActivitiesRequestSuccess action', () => {
  describe('getActivitiesRequestSuccess', () => {
    it('should create an GET_Activities_REQUEST_SUCCESS action', () => {
      const newActivities = [{ id: 1, name: 'finish redux', complete: false }, { id: 2, name: 'exercise', complete: true }]
      const action = getActivitiesRequestSuccess(newActivities)
      expect(action).toEqual({
        type: GET_ACTIVITIES_REQUEST_SUCCESS,
        newActivities: newActivities
      })
    })
  })
})

describe('updateActivityStatus action', () => {
  describe('updateActivityStatus', () => {
    it('should create an UPDATE_ACTIVITY_STATUS action', () => {
      const updatedActivity = { id: 1, name: 'finish redux', complete: false }
      const action = updateActivityStatus(updatedActivity)
      expect(action).toEqual({
        type: UPDATE_ACTIVITY_STATUS,
        updatedActivity: updatedActivity
      })
    })
  })
})

describe('getActivities', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })

  it('calls the request and success actions if the fetch response was successful', done => {
    const newActivities = [
      { id: 1, name: 'finish redux', complete: false }, 
      { id: 2, name: 'exercise', complete: true }
    ]

    fetchMock.get('/api/v1/activities.json', {
      status: 200,
      body: newActivities
    })

    const expectedActions = [
      { type: GET_ACTIVITIES_REQUEST_SUCCESS, newActivities: newActivities}
    ]
    const store = mockStore({
      activitiyList: []
    })

    store
      .dispatch(getActivities())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
  })
})


describe('patchActivity', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  })
  

  it('calls the request and success actions if the fetch response was successful', done => {
    
    const updatedActivity = { id: 1, name: 'finish redux', complete: false }
    fetchMock.patch(`/api/v1/activities/${updatedActivity.id}.json`, {
      status: 200,
      body: updatedActivity
    })

    const expectedActions = [
      { type: UPDATE_ACTIVITY_STATUS, updatedActivity: updatedActivity }
    ]
    const store = mockStore({
      activitiyList: []
    })

    store
      .dispatch(patchActivity(updatedActivity.id))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
        done()
      })
  })
})