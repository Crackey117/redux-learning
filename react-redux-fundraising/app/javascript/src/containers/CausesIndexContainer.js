import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCauses, updateSelectedCause } from '../modules/causes'
import CauseTile from '../components/CauseTile';

class CausesIndexContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCauses()
  }

  render() {

    const causeTiles = this.props.causeList.map(cause => {
      const handleSelect = () => {
        this.props.updateSelectedCause(cause.id)
      }

      return(
        <CauseTile
          key={cause.id}
          id={cause.id}
          name={cause.name}
          handleSelect={handleSelect}
        />
      )
    })

    return(
      <div>
        <h1>Existing Causes</h1>
        {causeTiles}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    causeList: state.causes.causeList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCauses: () => dispatch(getCauses()),
    updateSelectedCause: (causeId) => dispatch(updateSelectedCause(causeId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CausesIndexContainer);
