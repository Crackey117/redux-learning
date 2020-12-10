import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getArtists, updateSelectedArtist } from '../modules/playlists'
import ArtistTile from '../components/ArtistTile'

class ArtistsIndexContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getArtists()
  }

  render() {
    const artistTiles = this.props.artists.map(artist => {
      const selectedArtist = (event) => {
        event.preventDefault()
        this.props.updateSelectedArtist(artist.id)
      }
      return(
        <ArtistTile
          key={artist.id}
          artist={artist}
          handleSelect={selectedArtist}
        />
      )
    })

    return (
      <div className='columns small-10 medium-4'>
        <h1>Artists</h1>
        {artistTiles}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    artists: state.playlists.artists
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getArtists: () => dispatch(getArtists()),
    updateSelectedArtist: (artistId) => dispatch(updateSelectedArtist(artistId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistsIndexContainer)
