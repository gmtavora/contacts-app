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
  FAVORITE_ERROR,
  AVATAR_CHANGED,
  AVATAR_ERROR,
  CLEAR_AVATAR_RESPONSE,
  USER_INFO_CHANGED,
  CHANGE_USER_INFO_ERROR,
  CLEAR_USER_INFO_CHANGE_ERROR,
  CLEAR_USER_INFO_CHANGE_RESPONSE,
  PASSWORD_CHANGED,
  PASSWORD_CHANGE_ERROR,
  CLEAR_PASSWORD_RESPONSE
} from './actions';

const userReducer = (state = {contactCount: -1}, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {...state, ...action.payload};
    case LOG_IN_FULFILLED:
      return {...state, ...action.payload};
    case LOG_IN_REJECTED:
      return {...state, error: action.payload};
    case ERROR_DISPLAYED:
      return {...state, error: undefined};
    case LOG_OUT:
      return {};
    case REGISTRATION_REJECTED:
      return {...state, error: action.payload};
    case FRIENDS_LIST_REQUEST_FAILED:
      return {...state, error: action.payload};
    case FAVORITE_ERROR:
      return {...state, error: action.payload};
    case AVATAR_CHANGED:
      return {...state, avatarResponse: action.payload, avatar: action.payload.uri};
    case AVATAR_ERROR:
      return {...state, avatarResponse: action.payload};
    case CLEAR_AVATAR_RESPONSE:
      return {...state, avatarResponse: undefined};
    case USER_INFO_CHANGED:
      return {...state, ...action.payload, changeInfoResponse: true};
    case CHANGE_USER_INFO_ERROR:
      return {...state, error: action.payload};
    case CLEAR_USER_INFO_CHANGE_ERROR:
      return {...state, error: undefined};
    case CLEAR_USER_INFO_CHANGE_RESPONSE:
      return {...state, changeInfoResponse: undefined};
    case PASSWORD_CHANGED:
      return {...state, passwordResponse: action.payload};
    case PASSWORD_CHANGE_ERROR:
      return {...state, error: action.payload};
    case CLEAR_PASSWORD_RESPONSE:
      return {...state, passwordResponse: undefined};
    case RECEIVED_FRIENDS_LIST:
      return {...state, contactCount: action.payload.length}
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