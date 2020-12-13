import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getDonations } from '../modules/donations'
import NewDonationFormContainer from './NewDonationFormContainer';
import DonationTile from '../components/DonationTile';

class CauseShowContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getDonations(this.props.cause.id)
  }

  render() {
    const donationTiles = this.props.donationList.map(donation => {
      return(
        <DonationTile
          key={donation.id}
          name={donation.name}
          comment={donation.comment}
          amount={donation.amount}
        />
      )
    })

    return (
      <div>
        <hr />
        <h2>{this.props.cause.name}</h2>
        <h4>{this.props.cause.description}</h4>
        {donationTiles}
        <NewDonationFormContainer />
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    donationList: state.donations.donationList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDonations: (causeId) => dispatch(getDonations(causeId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CauseShowContainer);
