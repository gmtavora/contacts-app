import login from '../src/network/login';
import registerNewUser from '../src/network/registerNewUser';
import fetchContacts from '../src/network/fetchContacts';
import searchForUser from '../src/network/searchForUser';
import sendFriendInvitation from '../src/network/sendFriendInvitation';
import fetchFriendRequests from '../src/network/fetchFriendRequests';
import sendFriendAcceptance from '../src/network/sendFriendAcceptance';
import sendFriendRefusal from '../src/network/sendFriendRefusal';
import setFavorite from '../src/network/setFavorite';
import unsetFavorite from '../src/network/unsetFavorite';

export const UPDATE_USER = "UPDATE_USER";
export const LOG_IN_SENT = "LOG_IN_SENT";
export const LOG_IN_FULFILLED = "LOG_IN_FULFILLED";
export const LOG_IN_REJECTED = "LOG_IN_REJECTED";
export const ERROR_DISPLAYED = "ERROR_DISPLAYED";
export const LOG_OUT = "LOG_OUT";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTRATION_REJECTED = "REGISTRATION_REJECTED";
export const REQUESTED_FRIENDS_LIST = "REQUESTED_FRIENDS_LIST";
export const RECEIVED_FRIENDS_LIST = "RECEIVED_FRIENDS_LIST";
export const FRIENDS_LIST_REQUEST_FAILED = "FRIENDS_LIST_REQUEST_FAILED";
export const REQUESTED_USER_SEARCH = "REQUESTED_USER_SEARCH";
export const RECEIVED_USER_SEARCH = "RECEIVED_USER_SEARCH";
export const USER_SEARCH_FAILED = "USER_SEARCH_FAILED";
export const SEARCH_ERROR_DISPLAYED = "SEARCH_ERROR_DISPLAYED";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULT";
export const SENT_FRIEND_REQUEST = "SEND_FRIEND_REQUEST";
export const FRIEND_REQUESTED = "FRIEND_REQUEST_SENT";
export const FRIEND_REQUEST_FAILED = "FRIEND_REQUEST_FAILED";
export const CLEAR_REQUESTS = "CLEAR_REQUESTS";
export const REQUEST_LIST_REQUESTED = "REQUEST_LIST_REQUESTED";
export const REQUEST_LIST_RECEIVED = "REQUEST_LIST_RECEIVED";
export const REQUEST_LIST_ERROR = "REQUEST_LIST_ERROR";
export const REQUEST_ACCEPTANCE_SENT = "REQUEST_ACCEPTANCE_SENT";
export const REQUEST_ACCEPTED = "REQUEST_ACCEPTED";
export const REQUEST_ACCEPTANCE_ERROR = "REQUEST_ACCEPTANCE_ERROR";
export const REQUEST_REFUSAL_SENT = "REQUEST_REFUSAL_SENT";
export const REQUEST_REFUSED = "REQUEST_REFUSED";
export const REQUEST_REFUSAL_ERROR = "REQUEST_REFUSAL_ERROR";
export const SET_FAVORITE_SENT = "SET_FAVORITE_SENT";
export const FAVORITE_SETTED = "FAVORITE_SETTED";
export const FAVORITE_ERROR = "FAVORITE_ERROR";
export const UNSET_FAVORITE_SENT = "UNSET_FAVORITE_SENT";
export const FAVORITE_UNSETTED = "FAVORITE_UNSETTED";

export const updateUser = (info) => ({
  action: UPDATE_USER,
  payload: info
});

export const clearError = () => ({
  type: ERROR_DISPLAYED
});

export const logOutUser = () => ({
  type: LOG_OUT
});

export const clearSearchError = () => ({
  type: SEARCH_ERROR_DISPLAYED
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});

export const clearRequest = () => ({
  type: CLEAR_REQUESTS
});

export const logInUser = (username, password) => async dispatch => {
  dispatch({type: LOG_IN_SENT});
  try {
    const {token, id} = await login(username, password);
    dispatch({type: LOG_IN_FULFILLED, payload: {token, id}});
  } catch (error) {
    dispatch({type: LOG_IN_REJECTED, payload: error.message});
  }
};

export const registerUser = (userInfo) => async dispatch => {
  dispatch({type: REGISTER_USER});
  try {
    const {token, id} = await registerNewUser(userInfo);
    dispatch({type: LOG_IN_FULFILLED, payload: {token, id}});
  } catch (error) {
    dispatch({type: REGISTRATION_REJECTED, payload: error.message});
  }
};

export const getFriendsList = (token, id) => async dispatch => {
  dispatch({type: REQUESTED_FRIENDS_LIST});
  try {
    const contacts = await fetchContacts(token, id);
    dispatch({type: RECEIVED_FRIENDS_LIST, payload: contacts});
  } catch (error) {
    dispatch({type: FRIENDS_LIST_REQUEST_FAILED, payload: error.message});
  }
};

export const findUserByName = (token, word) => async dispatch => {
  dispatch({type: REQUESTED_USER_SEARCH});
  try {
    const result = await searchForUser(token, word);
    dispatch({type: RECEIVED_USER_SEARCH, payload: result});
  } catch (error) {
    dispatch({type: USER_SEARCH_FAILED, payload: error.message});
  }
};

export const sendFriendRequest = (token, requester, requested) => async dispatch => {
  dispatch({type: SENT_FRIEND_REQUEST});
  try {
    await sendFriendInvitation(token, requester, requested);
    dispatch({type: FRIEND_REQUESTED});
  } catch (error) {
    dispatch({type: FRIEND_REQUEST_FAILED, payload: error.message});
  }
};

export const getFriendRequests = (token, requested) => async dispatch => {
  dispatch({type: REQUEST_LIST_REQUESTED});
  try {
    const result = await fetchFriendRequests(token, requested);
    dispatch({type: REQUEST_LIST_RECEIVED, payload: result});
  } catch (error) {
    dispatch({type: REQUEST_LIST_ERROR, payload: error.message});
  }
};

export const acceptFriendRequest = (token, requested, id) => async dispatch => {
  dispatch({type: REQUEST_ACCEPTANCE_SENT});
  try {
    const response = await sendFriendAcceptance(token, requested, id);
    dispatch({type: REQUEST_ACCEPTED, payload: response});
  } catch (error) {
    dispatch({type: REQUEST_ACCEPTANCE_ERROR, payload: error.message});
  }
};

export const refuseFriendRequest = (token, requested, id) => async dispatch => {
  dispatch({type: REQUEST_REFUSAL_SENT});
  try {
    const response = await sendFriendRefusal(token, requested, id);
    dispatch({type: REQUEST_REFUSED, payload: response});
  } catch (error) {
    dispatch({type: REQUEST_REFUSAL_ERROR, payload: error.message});
  }
};

export const addFavorite = (token, user, favorite) => async dispatch => {
  dispatch({type: SET_FAVORITE_SENT});
  try {
    await setFavorite(token, user, favorite);
    dispatch({type: FAVORITE_SETTED, payload: favorite});
  } catch (error) {
    dispatch({type: FAVORITE_ERROR, payload: error.message});
  }
};

export const removeFavorite = (token, user, favorite) => async dispatch => {
  dispatch({type: UNSET_FAVORITE_SENT});
  try {
    await unsetFavorite(token, user, favorite);
    dispatch({type: FAVORITE_UNSETTED, payload: favorite});
  } catch (error) {
    dispatch({type: FAVORITE_ERROR, payload: error.message});
  }
};