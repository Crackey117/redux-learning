import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearForm, handleOrderChange, addNewDonutOrder } from '../modules/donuts'
import InputField from '../components/InputField'

class NewDonutOrderFormContainer extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  // Below function will utilize the donutOrderList from your store and
  // calculates id of next item in place of a database
  calculateNewId() {
    if (this.props.donutOrderList.length === 0) {
      return 1
    } else {
      const donutIds = this.props.donutOrderList.map(donut => donut.id)
      return Math.max(...donutIds) + 1
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()
    const newId = this.calculateNewId()
    const newDonutOrder = {
      id: newId,
      name: this.props.name,
      flavor: this.props.flavor
    }
    this.props.addNewDonutOrder(newDonutOrder)
    this.props.clearForm()
  }

  render() {
    return (
      <div className='small-6 columns'>
        <h1>Add a New Donut Order</h1>
        <form onSubmit={this.handleFormSubmit}>
          <InputField
            key='newName'
            label='Your Name'
            type='text'
            name='name'
            value={this.props.name}
            handleChange={this.props.handleOrderChange}
          />
          <InputField
            key='newFlavor'
            label='Flavor'
            type='text'
            name='flavor'
            value={this.props.flavor}
            handleChange={this.props.handleOrderChange}
          />
          <input type='submit' />
        </form>
      </div>
    )
  }
};
const mapStateToProps = (state) => {
  return {
    name: state.donuts.order.name,
    flavor: state.donuts.order.flavor,
    donutOrderList: state.donuts.donutOrderList
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addNewDonutOrder: (order) => dispatch(addNewDonutOrder(order)),
    handleOrderChange: (event) => dispatch(handleOrderChange(event)),
    clearForm: () => dispatch(clearForm())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewDonutOrderFormContainer)
