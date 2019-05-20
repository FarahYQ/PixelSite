import * as SessionUtil from '../utils/session_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER ";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_SESSION_ERRORS = "ECEIVE_SESSION_ERRORS";


export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
})

export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const signup = (user) => dispatch => {
    SessionUtil.signup(user)
        .then(() => dispatch(receiveUserSignIn()))
        .catch(err => dispatch(receiveErrors(err.response.data)))
};