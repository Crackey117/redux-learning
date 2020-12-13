import { combineReducers }          from 'redux';

import { causes } from '../modules/causes'
import { donations } from '../modules/donations'

let rootReducer = combineReducers({
  causes,
  donations
});

export default rootReducer;
