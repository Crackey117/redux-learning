import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getSongs, postPlaylistSong } from '../modules/playlists'

import SongTile from '../components/SongTile'

class SongsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentDidUpdate(prevProps) {
    if (this.props.selectedArtist !== prevProps.selectedArtist) {
      this.props.getSongs(this.props.selectedArtist)
    }
  }

  render() {
    
    const songTiles = this.props.songs.map(song => {
      const addSong = () => {
        this.props.postPlaylistSong(song)
      }
      return(
        <SongTile
          key={song.id}
          song={song}
          handleClick={addSong}
          type='add'
        />
      )
    })

    return(
      <div className='columns small-10 medium-4'>
        <h1>Available Songs</h1>
        {songTiles}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    songs: state.playlists.artistSongs,
    selectedArtist: state.playlists.selectedArtistId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSongs: (artistId) => dispatch(getSongs(artistId)),
    postPlaylistSong: (song) => dispatch(postPlaylistSong(song))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SongsIndexContainer)

