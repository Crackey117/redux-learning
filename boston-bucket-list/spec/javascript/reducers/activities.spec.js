// test your reducer here
import {
  activities,
  initialState,
  GET_ACTIVITIES_REQUEST_SUCCESS,
  UPDATE_ACTIVITY_STATUS
} from '../../../app/javascript/react/modules/activities.js'


describe('activities reducer', () => {
  it('should set an initial state', () => {
    const newState = activities(undefined, {})
    expect(newState).toEqual(initialState)
  })

  it('updates an activity UPDATE_ACTIVITY_STATUS action type is received', () => {
    const updatedActivity = { id: 1, name: 'finish redux', complete: false }
    const action = { type: UPDATE_ACTIVITY_STATUS, updatedActivity }
    const newState = activities(initialState, action)

    expect(newState.activityList).toEqual([updatedActivity])
  })

  it('updates the activities list when GET_ACTIVITIES_REQUEST_SUCCESS action type is received', () => {
    const newActivities = [{ id: 1, name: 'finish redux', complete: false }, { id: 2, name: 'exercise', complete: true }]
    const action = { type: GET_ACTIVITIES_REQUEST_SUCCESS, newActivities: newActivities }
    const newState = activities(initialState, action)
    expect(newState["activityList"]).toEqual(newActivities)
  })
})
