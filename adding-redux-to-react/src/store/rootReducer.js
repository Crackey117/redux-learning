import { combineReducers } from 'redux'

import { groceries } from '../modules/groceries'

const rootReducer = combineReducers({
  groceries: groceries
})

export default rootReducer