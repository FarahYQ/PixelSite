import * as SessionUtil from '../utils/session_util';
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER ";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_SESSION_ERRORS = "ECEIVE_SESSION_ERRORS";

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
})

export const signup = (user) => dispatch => {
    SessionUtil.signup(user).then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decoded(token);
    }).catch(err => dispatch(receiveErrors(err.response.data)))
};

export const login = (user) => dispatch => {
    SessionUtil.login(user).then(res => {
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        const decoded = jwt_decoded(token);
    }).catch(err => dispatch(receiveErrors(err.response.data)))
};