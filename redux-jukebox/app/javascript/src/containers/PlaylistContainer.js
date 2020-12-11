import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlaylistSongs } from '../modules/playlists'
import SongTile from '../components/SongTile'

class PlaylistContainer extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getPlaylistSongs()
  }
  
  render() {
  
    const songTiles = this.props.playlistSongs.map(playlistSong => {
      return(
        <SongTile
          key={playlistSong.id}
          song={playlistSong.song}
          // below can be left alone until working on Exceeds functionality
          handleClick={() => {}}
        />
      )
    })

    return(
      <div className='columns small-10 medium-4'>
        <h1>Current Playlist</h1>
        {songTiles}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    playlistSongs: state.playlists.playlistSongs
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPlaylistSongs: () => dispatch(getPlaylistSongs()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistContainer)

