import React, { Component } from 'react';
import { connect } from 'react-redux';

import CausesIndexContainer from './CausesIndexContainer'
import CauseShowContainer from './CauseShowContainer'

class CausesPageContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let selectedCauseSection;
    if(this.props.selectedCauseId) {
      const selectedCause = this.props.causeList.filter(cause => {
        return cause.id === this.props.selectedCauseId
      })
      selectedCauseSection =
        <CauseShowContainer
          cause={selectedCause[0]}
        />
    }

    return (
      <div className='row'>
        <CausesIndexContainer />
        {selectedCauseSection}
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    causeList: state.causes.causeList,
    selectedCauseId: state.causes.selectedCauseId
  }
}

export default connect(
  mapStateToProps,
  null
)(CausesPageContainer);
