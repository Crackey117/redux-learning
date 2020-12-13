import { displayAlertMessage } from './alertMessage.js'

const initialState = {
  causeList: [],
  selectedCauseId: null
}

const causes = (state = initialState, action) => {
  switch(action.type) {
    case GET_CAUSES_REQUEST:
      return {...state, isFetching: true }
    case GET_CAUSES_REQUEST_SUCCESS:
      return {...state,
        causeList: action.causes,
        isFetching: false
      }
    case GET_CAUSES_REQUEST_FAILURE:
      return {...state, isFetching: false }
    case UPDATE_SELCETED_CAUSE_REQUEST:
      return {...state, selectedCauseId: action.causeId}
    default:
      return state
  }
};


const GET_CAUSES_REQUEST = 'GET_CAUSES_REQUEST'

const getCausesRequest = () => {
  return {
    type: GET_CAUSES_REQUEST
  }
}

const GET_CAUSES_REQUEST_SUCCESS = 'GET_CAUSES_REQUEST_SUCCESS'

const getCausesRequestSuccess = causes => {
  return {
    type: GET_CAUSES_REQUEST_SUCCESS,
    causes
  }
}

const GET_CAUSES_REQUEST_FAILURE = 'GET_CAUSES_REQUEST_FAILURE'

const getCausesRequestFailure = () => {
  return {
    type: GET_CAUSES_REQUEST_FAILURE
  }
}

const getCauses = () => {
  return dispatch => {
    dispatch(getCausesRequest())

    return fetch('/api/v1/causes.json')
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(getCausesRequestFailure())
        dispatch(displayAlertMessage("Something went wrong."))
        return { error: 'Something went wrong.' }
      }
    })
    .then(causes => {
      if(!causes.error) {
        dispatch(getCausesRequestSuccess(causes))
      }
    })
  }
}

const UPDATE_SELCETED_CAUSE_REQUEST = "UPDATE_SELECTED_CAUSE_REQUEST"

const updateSelectedCauseRequest = causeId => {
  return {
    type: UPDATE_SELCETED_CAUSE_REQUEST, 
    causeId
  }
}

const updateSelectedCause = (causeId) => {
  return dispatch => {
    dispatch(updateSelectedCauseRequest(causeId))
  }
}
export {
  causes,
  getCauses,
  updateSelectedCause
};
