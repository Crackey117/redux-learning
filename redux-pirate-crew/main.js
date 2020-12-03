const { createStore } = Redux;

// Your initial state, reducer, constants, action creators, and JS code should go here!


const initialState = {
  pirates: [
    {
      name: "Jack"
    }
  ]
}

const pirateReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PIRATE:
      const newPirateArray = state.pirates.concat(action.newPirate)
      return Object.assign({}, state, {
        pirates: newPirateArray
      })
    default:
      return state;
  }
}

const newPirateForm = document.getElementById('new-pirate-form')

const ADD_PIRATE = 'ADD_PIRATE'

const addPirateToList = newPirate => {
  return {
    type: ADD_PIRATE,
    newPirate: newPirate
  }
}

newPirateForm.addEventListener('submit', () => {
  event.preventDefault();
  const name = document.getElementById('name').value 
  document.getElementById('name').value = ''
  const newPirate = { name: name }
  store.dispatch(addPirateToList(newPirate))
})

const store = createStore(pirateReducer);

const pirateList = document.getElementById('current-crew')

const render = () => {
  let newPirateList = ''
  store.getState().pirates.forEach(function(pirate) {
    newPirateList += `<li>${pirate.name}</li>`
  })
  pirateList.innerHTML = newPirateList
}

render();
store.subscribe(render); 