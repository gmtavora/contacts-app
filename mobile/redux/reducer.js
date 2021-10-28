import { combineReducers } from 'redux';

import {
  UPDATE_USER,
  LOG_IN_FULFILLED,
  LOG_IN_REJECTED,
  ERROR_DISPLAYED,
  LOG_OUT,
  REGISTRATION_REJECTED,
  RECEIVED_FRIENDS_LIST,
  FRIENDS_LIST_REQUEST_FAILED,
  REQUESTED_USER_SEARCH,
  RECEIVED_USER_SEARCH,
  USER_SEARCH_FAILED,
  SEARCH_ERROR_DISPLAYED,
  CLEAR_SEARCH_RESULTS,
  SENT_FRIEND_REQUEST,
  FRIEND_REQUESTED,
  FRIEND_REQUEST_FAILED,
  CLEAR_REQUESTS,
  REQUEST_LIST_REQUESTED,
  REQUEST_LIST_RECEIVED,
  REQUEST_LIST_ERROR,
  REQUEST_ACCEPTANCE_SENT,
  REQUEST_ACCEPTED,
  REQUEST_ACCEPTANCE_ERROR,
  REQUEST_REFUSAL_SENT,
  REQUEST_REFUSED,
  REQUEST_REFUSAL_ERROR,
  FAVORITE_SETTED,
  FAVORITE_UNSETTED,
  FAVORITE_ERROR
} from './actions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {...state, ...action.payload};
    case LOG_IN_FULFILLED:
      return {...state, token: action.payload.token, id: action.payload.id};
    case LOG_IN_REJECTED:
      return {...state, error: action.payload};
    case ERROR_DISPLAYED:
      return {...state, error: undefined};
    case LOG_OUT:
      return {token: undefined, id: undefined};
    case REGISTRATION_REJECTED:
      return {...state, error: action.payload};
    case FRIENDS_LIST_REQUEST_FAILED:
      return {...state, error: action.payload};
    case FAVORITE_ERROR:
      return {...state, error: action.payload};
    default:
      return state;
  }
}

const contactReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVED_FRIENDS_LIST:
      return action.payload;
    case FAVORITE_SETTED:
      return [...state.map((letter) => (
        {
          ...letter,
          data: letter.data.map((item) => {
            if (action.payload === item.id)
              return {...item, favorite: true};
              else return item
          })
        }
      ))];
    case FAVORITE_UNSETTED:
      return [...state.map((letter) => (
        {
          ...letter,
          data: letter.data.map((item) => {
            if (action.payload === item.id)
              return {...item, favorite: false};
              else return item
          })
        }
      ))];
    case LOG_OUT:
      return [];
    default:
      return state;
  }
};

const userSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUESTED_USER_SEARCH:
      return {...state, requested: true, result: undefined};
    case RECEIVED_USER_SEARCH:
      return {...state, result: action.payload, requested: false};
    case USER_SEARCH_FAILED:
      return {...state, result: undefined, requested: false};
    case CLEAR_SEARCH_RESULTS:
      return {...state, result: undefined};
    case USER_SEARCH_FAILED:
      return {...state, error: action.payload};
    case SEARCH_ERROR_DISPLAYED:
      return {...state, error: undefined};
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};

const requestsReducer = (state = {}, action) => {
  switch (action.type) {
    case SENT_FRIEND_REQUEST:
      return {...state, sentFriendRequest: true};
    case FRIEND_REQUESTED:
      return {...state, sentFriendRequest: undefined, requestRegistered: true};
    case FRIEND_REQUEST_FAILED:
      return {...state, sentFriendRequest: undefined, error: action.payload};
    case CLEAR_REQUESTS:
      return {...state, requestRegistered: undefined, requestAcceptance: undefined, requestRefusal: undefined, error: undefined};
    case REQUEST_LIST_REQUESTED:
      return {...state, requestedRequestsList: true};
    case REQUEST_LIST_RECEIVED:
      return {...state, requestedRequestsList: undefined, list: action.payload};
    case REQUEST_LIST_ERROR:
      return {...state, requestedRequestsList: undefined, error: action.payload};
    case REQUEST_ACCEPTANCE_SENT:
      return {...state, requestAcceptanceSent: true};
    case REQUEST_ACCEPTED:
      return {...state, requestAcceptanceSent: undefined, requestAcceptance: action.payload};
    case REQUEST_ACCEPTANCE_ERROR:
      return {...state, requestAcceptanceSent: undefined, error: action.payload};
    case REQUEST_REFUSAL_SENT:
      return {...state, requestRefusalSent: true};
    case REQUEST_REFUSED:
      return  {...state, requestRefusalSent: undefined, requestRefusal: action.payload};
    case REQUEST_REFUSAL_ERROR:
      return {...state, requestRefusalSent: undefined, error: action.payload};
    case LOG_OUT:
      return {};
    default:
      return state;
  }
};

export default combineReducers({
  user: userReducer,
  contacts: contactReducer,
  userSearch: userSearchReducer,
  requests: requestsReducer
});