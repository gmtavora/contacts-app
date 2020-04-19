import { combineReducers } from 'redux';

import { UPDATE_CONTACT } from './actions';

const contactReducer = (state = [], action) => {
  switch (action) {
    case UPDATE_CONTACT:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default combineReducers({
  contacts: contactReducer
});