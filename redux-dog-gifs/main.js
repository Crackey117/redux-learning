const { createStore } = Redux;

const initialState = {
  pups: [
    {
      rating: '5',
      url: 'https://media.giphy.com/media/mokQK7oyiR8Sk/giphy.gif'
    }
  ]
}

// Reducer

const gifReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PUP:
      const newGifArray = state.pups.concat(action.newPup)
      return Object.assign({}, state, {
        pups: newGifArray
      })
    default:
      return state;
  }
}

// JS to access new pup form

const newPupForm = document.getElementById('new-pup-form')

// Declare action type

const ADD_PUP = 'ADD_PUP'

// Submits form and dispatches add action

newPupForm.addEventListener('submit', () => {
  event.preventDefault();
  const gifUrl = document.getElementById('gif-url').value
  const gifRating = document.getElementById('gif-rating').value
  document.getElementById('gif-url').value = ''
  document.getElementById('gif-rating').value = ''
  const newPup = { url: gifUrl, rating: gifRating }
  store.dispatch(
    {
      type: ADD_PUP,
      newPup: newPup
    }
  )
})

// Sets up store
const store = createStore(gifReducer);

// Renders list of gifs to page
const gifList = document.getElementById('gif-list')
const render = () => {
  let newGifList = ``
  console.log(store.getState());
  store.getState().pups.forEach(function(pup) {
    newGifList += `<li>${pup.rating} <img src=${pup.url}/> </li>`
  })
  gifList.innerHTML = newGifList
}

render();
store.subscribe(render);