// Action type constants go here
const ADD_DONUT_ORDER = 'ADD_DONUT_ORDER'
const HANDLE_ORDER_CHANGE = 'HANDLE_ORDER_CHANGE'
const CLEAR_FORM = 'CLEAR_FORM'

// Action creators go here
const addNewDonutOrder = order => {
  return {
    type: ADD_DONUT_ORDER,
    order
  }
}
const handleOrderChange = event => {
  return {
    type: HANDLE_ORDER_CHANGE,
    change: {[event.currentTarget.name]: event.currentTarget.value }
  }
}

const clearForm = () => {
  return {
    type: CLEAR_FORM
  }
}

// Reducer and its initialState go here

const initialState = {
  donutOrderList: [
    {
      id: 1,
      name: 'Brianna',
      flavor: 'Everything Bagel Doughnut'
    },
    {
      id: 2,
      name: "Alex",
      flavor: 'Blackberry Hibiscus'
    },
    {
      id: 3,
      name: 'Dan',
      flavor: 'The biggest coffee roll ever'
    }
  ],
  order: {
    name: '',
    flavor: ''
  }
}

const donuts = (state = initialState, action) => {
  switch(action.type) {
    case ADD_DONUT_ORDER:
      const newDonutOrderList = state.donutOrderList.concat(action.order)
      return {...state, donutOrderList: newDonutOrderList }
    case HANDLE_ORDER_CHANGE:
      return {...state, order: Object.assign(state.order, action.change)}
    case CLEAR_FORM:
      return {...state, order: {name: '', flavor: ''}}
    default:
      return state
  }
};

// Export statement goes here

export {
  donuts,
  addNewDonutOrder,
  handleOrderChange,
  clearForm
};
