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
      return {...state, selectedArtistId: action.artistId}
    case POST_PLAYLIST_SONG_REQUEST:
      return {...state, isFetching: true }
    case POST_PLAYLIST_SONG_REQUEST_SUCCESS:
      const newPlaylistSongs = state.playlistSongs.concat(action.playlistSong)
      return {...state,
        playlistSongs: newPlaylistSongs,
        isFetching: false
      }
    case POST_PLAYLIST_SONG_REQUEST_FAILURE:
      return {...state, isFetching: false }
    case GET_PLAYLIST_SONGS_REQUEST:
      return {...state, isFetching: true }
    case GET_PLAYLIST_SONGS_REQUEST_SUCCESS:
      return {...state,
        playlistSongs: action.playlistSongs,
        isFetching: false
      }
    case GET_PLAYLIST_SONGS_REQUEST_FAILURE:
      return {...state, isFetching: false }
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
        dispatch(getArtistsRequestFailure())
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
        dispatch(getSongsRequestFailure())
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

const POST_PLAYLIST_SONG_REQUEST = 'POST_PLAYLIST_SONG_REQUEST'

const postPlaylistSongRequest = () => {
  return {
    type: POST_PLAYLIST_SONG_REQUEST
  }
}

const POST_PLAYLIST_SONG_REQUEST_SUCCESS = 'POST_PLAYLIST_SONG_REQUEST_SUCCESS'

const postPlaylistSongRequestSuccess = playlistSong => {
  return {
    type: POST_PLAYLIST_SONG_REQUEST_SUCCESS,
    playlistSong
  }
}

const POST_PLAYLIST_SONG_REQUEST_FAILURE = 'POST_PLAYLIST_SONG_REQUEST_FAILURE'

const postPlaylistSongRequestFailure = () => {
  return {
    type: POST_PLAYLIST_SONG_REQUEST_FAILURE
  }
}
const GET_PLAYLIST_SONGS_REQUEST = 'GET_PLAYLIST_SONGS_REQUEST'

const getPlaylistSongsRequest = () => {
  return {
    type: GET_PLAYLIST_SONGS_REQUEST
  }
}

const GET_PLAYLIST_SONGS_REQUEST_SUCCESS = 'GET_PLAYLIST_SONGS_REQUEST_SUCCESS'

const getPlaylistSongsRequestSuccess = playlistSongs => {
  return {
    type: GET_PLAYLIST_SONGS_REQUEST_SUCCESS,
    playlistSongs
  }
}

const GET_PLAYLIST_SONGS_REQUEST_FAILURE = 'GET_PLAYLIST_SONGS_REQUEST_FAILURE'

const getPlaylistSongsRequestFailure = () => {
  return {
    type: GET_PLAYLIST_SONGS_REQUEST_FAILURE
  }
}



const postPlaylistSong = song => {
  return dispatch => {
    dispatch(postPlaylistSongRequest())
    return fetch(`/api/v1/songs/${song.id}/playlist_songs.json`,
      {
        method: 'POST',
        body: JSON.stringify(song),
        credentials: 'same-origin',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    )
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(postPlaylistSongRequestFailure())
        dispatch(displayAlertMessage("Something went wrong."))
       return { error: 'Something went wrong.' }
      }
    })
    .then(song => {
      if(!song.error) {
        dispatch(postPlaylistSongRequestSuccess(song))
      }
    })
  }
}
const getPlaylistSongs = () => {
  return dispatch => {
    dispatch(getPlaylistSongsRequest())

    return fetch('/api/v1/playlist_songs.json')
    .then(response => {
      if(response.ok) {
        return response.json()
      } else {
        dispatch(getPlaylistSongsRequestFailure())
        dispatch(displayAlertMessage("Something went wrong."))
        return { error: 'Something went wrong.' }
      }
    })
    .then(playlistSongs => {
      if(!playlistSongs.error) {
        dispatch(getPlaylistSongsRequestSuccess(playlistSongs))
      }
    })
  }
}
export {
  playlists,
  getArtists,
  updateSelectedArtist,
  getSongs,
  postPlaylistSong,
  getPlaylistSongs
}
