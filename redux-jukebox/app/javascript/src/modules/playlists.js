import { displayAlertMessage } from './alertMessage.js'

const initialState = {
  artists: [],
  artistSongs: [],
  selectedArtistId: null,
  playlistSongs: [],
  isFetching: false
}

const playlists = (state = initialState, action) => {
  switch(action.type) {
    case GET_ARTISTS_REQUEST:
      return {...state, isFetching: true }
    case GET_ARTISTS_REQUEST_SUCCESS:
      return {...state,
        artists: action.artists,
        isFetching: false
      }
    case GET_ARTISTS_REQUEST_FAILURE:
      return {...state, isFetching: false }
    case GET_SONGS_REQUEST:
      return {...state, isFetching: true }
    case GET_SONGS_REQUEST_SUCCESS:
      return {...state,
        artistSongs: action.songs,
        isFetching: false
      }
    case GET_SONGS_REQUEST_FAILURE:
      return {...state, isFetching: false }
    case UPDATE_SELCETED_ARTIST_REQUEST:
      console.log(action.artistId)
      return {...state, selectedArtistId: action.artistId}
    default:
      return state
  }
}


const GET_ARTISTS_REQUEST = 'GET_ARTISTS_REQUEST'

const getArtistsRequest = () => {
  return {
    type: GET_ARTISTS_REQUEST
  }
}

const GET_ARTISTS_REQUEST_SUCCESS = 'GET_ARTISTS_REQUEST_SUCCESS'

const getArtistsRequestSuccess = artists => {
  return {
    type: GET_ARTISTS_REQUEST_SUCCESS,
    artists
  }
}

const GET_ARTISTS_REQUEST_FAILURE = 'GET_ARTISTS_REQUEST_FAILURE'

const getArtistsRequestFailure = () => {
  return {
    type: GET_ARTISTS_REQUEST_FAILURE
  }
}

const UPDATE_SELCETED_ARTIST_REQUEST = "UPDATE_SELECTED_ARTIST_REQUEST"

const updateSelectedArtistRequest = artistId => {
  return {
    type: UPDATE_SELCETED_ARTIST_REQUEST, 
    artistId
  }
}

const GET_SONGS_REQUEST = 'GET_SONGS_REQUEST'

const getSongsRequest = () => {
  return {
    type: GET_SONGS_REQUEST
  }
}

const GET_SONGS_REQUEST_SUCCESS = 'GET_SONGS_REQUEST_SUCCESS'

const getSongsRequestSuccess = songs => {
  return {
    type: GET_SONGS_REQUEST_SUCCESS,
    songs
  }
}

const GET_SONGS_REQUEST_FAILURE = 'GET_SONGS_REQUEST_FAILURE'

const getSongsRequestFailure = () => {
  return {
    type: GET_SONGS_REQUEST_FAILURE
  }
}

const getArtists = () => {
  return dispatch => {
    dispatch(getArtistsRequest())

    return fetch('/api/v1/artists.json')
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
       dispatch(displayAlertMessage("Something went wrong."))
       return { error: 'Something went wrong.' }
      }
    })
    .then(artists => {
      if(!artists.error) {
        dispatch(getArtistsRequestSuccess(artists))
      }
    })
  }
}

const updateSelectedArtist = (artistId) => {
  return dispatch => {
    dispatch(updateSelectedArtistRequest(artistId))
  }
}
const getSongs = (artistId) => {
  return dispatch => {
    dispatch(getSongsRequest())
    return fetch(`/api/v1/artists/${artistId}/songs.json`)
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
       dispatch(displayAlertMessage("Something went wrong."))
       return { error: 'Something went wrong.' }
      }
    })
    .then(songs => {
      if(!songs.error) {
        dispatch(getSongsRequestSuccess(songs))
      }
    })
  }
}




export {
  playlists,
  getArtists,
  updateSelectedArtist,
  getSongs
}
