const initialState = {
  donationList: [],
  newName: '',
  newComment: '',
  newAmount: ''
}

const donations = (state = initialState, action) => {
  switch(action.type) {
    case HANDLE_FIELD_CHANGE:
      return {...state, [action.newField]: action.newValue}
    case GET_DONATIONS_REQUEST:
      return {...state, isFetching: true }
    case GET_DONATIONS_REQUEST_SUCCESS:
      return {...state,
        donationList: action.donations,
        isFetching: false
      }
    case GET_DONATIONS_REQUEST_FAILURE:
      return {...state, isFetching: false }
    case POST_DONATION_REQUEST:
      return {...state, isFetching: true }
    case POST_DONATION_REQUEST_SUCCESS:
      const newDonationList = state.donationList.concat(action.donation)
      return {...state,
        donationList: newDonationList,
        isFetching: false
      }
    case POST_DONATION_REQUEST_FAILURE:
      return {...state, isFetching: false }
    default:
      return state
  }
};

const HANDLE_FIELD_CHANGE = 'HANDLE_FIELD_CHANGE'

const handleFieldChange = event => {
  const newField = event.target.name
  const newValue = event.target.value

  return {
    type: HANDLE_FIELD_CHANGE,
    newField,
    newValue
  }
}

const postDonation = (donationInfo, selectedCauseId) => {
  return dispatch => {
    dispatch(postDonationRequest())
    return fetch(`/api/v1/causes/${selectedCauseId}/donations.json`,
      {
        method: 'POST',
        body: JSON.stringify(donationInfo),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(postDonationRequestFailure())
        dispatch(displayAlertMessage("Something went wrong."))
       return { error: 'Something went wrong.' }
      }
    })
    .then(donation => {
      if(!donation.error) {
        dispatch(postDonationRequestSuccess(donation))
      }
    })
  }
}


const GET_DONATIONS_REQUEST = 'GET_DONATIONS_REQUEST'

const getDonationsRequest = () => {
  return {
    type: GET_DONATIONS_REQUEST
  }
}

const GET_DONATIONS_REQUEST_SUCCESS = 'GET_DONATIONS_REQUEST_SUCCESS'

const getDonationsRequestSuccess = donations => {
  return {
    type: GET_DONATIONS_REQUEST_SUCCESS,
    donations
  }
}
const GET_DONATIONS_REQUEST_FAILURE = 'GET_DONATIONS_REQUEST_FAILURE'

const getDonationsRequestFailure = () => {
  return {
    type: GET_DONATIONS_REQUEST_FAILURE
  }
}

const getDonations = (causeId) => {
  return dispatch => {
    dispatch(getDonationsRequest())
    return fetch(`/api/v1/causes/${causeId}/donations.json`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(getDonationsRequestFailure())
        dispatch(displayAlertMessage("Something went wrong."))
        return { error: 'Something went wrong.' }
      }
    })
    .then(donations => {
      if(!donations.error) {
        dispatch(getDonationsRequestSuccess(donations))
      }
    })
  }
}

const POST_DONATION_REQUEST = 'POST_DONATION_REQUEST'

const postDonationRequest = () => {
  return {
    type: POST_DONATION_REQUEST
  }
}

const POST_DONATION_REQUEST_SUCCESS = 'POST_DONATIONS_REQUEST_SUCCESS'

const postDonationRequestSuccess = donation => {
  return {
    type: POST_DONATION_REQUEST_SUCCESS,
    donation
  }
}

const POST_DONATION_REQUEST_FAILURE = 'POST_DONATION_REQUEST_FAILURE'

const postDonationRequestFailure = () => {
  return {
    type: POST_DONATION_REQUEST_FAILURE
  }
}
export {
  donations,
  handleFieldChange,
  postDonation,
  getDonations
}
