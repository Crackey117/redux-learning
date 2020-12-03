const { createStore } = Redux;

// Your initial state, reducer, constants, action creators, and JS code should go here!


const initialState = {
  pirates: [
    {
      name: "Jack"
    }
  ],
  walkedCrew: [
  ],
  walkedPlank: 0
}



const pirateReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PIRATE:
      const newPirateArray = state.pirates.concat(action.newPirate)
      return Object.assign({}, state, {
        pirates: newPirateArray
      })
    case WALK_PLANK:
      const newWalkedCrewMember = state.pirates.shift()
      const newPirateList = state.pirates
      const walkedPlank = state.walkedPlank + 1
      const newWalkedCrew = state.walkedCrew.concat(newWalkedCrewMember)
      return Object.assign({}, state, {
        pirates: newPirateList,
        walkedCrew: newWalkedCrew,
        walkedPlank: walkedPlank
      })
    default:
      return state;
  }
}

const walkedCrew = document.getElementById('walked-crew')
const plantWalkers = document.getElementById('plank-walkers')
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
const WALK_PLANK = 'WALK_PLANK'
const walkPlankButton = document.getElementById('walk-the-plank')
walkPlankButton.addEventListener('click', () => {
  store.dispatch({
    type: WALK_PLANK
  })
})
const store = createStore(pirateReducer);

const pirateList = document.getElementById('current-crew')
const walkedCrewList = document.getElementById('walked-crew')
const plantWalkersNumber = document.getElementById('plank-walkers')
const render = () => {
  let newPirateList = ''
  store.getState().pirates.forEach(function(pirate) {
    newPirateList += `<li>${pirate.name}</li>`
  })
  let newWalkedList = ''
  store.getState().walkedCrew.forEach(function(pirate) {
    newWalkedList += `<li>${pirate.name}</li>`
  })
  pirateList.innerHTML = newPirateList
  if(store.getState().walkedCrew.length > 0){
    walkedCrewList.innerHTML = newWalkedList
  }
  plantWalkersNumber.innerHTML = store.getState().walkedPlank
}

render();
store.subscribe(render); 