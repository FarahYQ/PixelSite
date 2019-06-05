import * as SessionUtil from '../utils/session_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER ";
export const LOGOUT_CURRENT_USER = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const clearErrors = () => ({
    type: CLEAR_SESSION_ERRORS
})

export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
})

export const logoutUser = () => ({
    type: LOGOUT_CURRENT_USER
})

// thunk functions

export const signup = (user) => {
    return dispatch => {
        return SessionUtil.signup(user).then(
            res => {
                const { token, user } = res.data;
                localStorage.setItem("jwtToken", token);
                localStorage.setItem("currrentUser", JSON.stringify(user))
                SessionUtil.setAuthToken(token);
                return dispatch(receiveCurrentUser(user));
            }).catch(
                err => dispatch(receiveErrors(err.response.data))
            )
    };
};

export const login = (user) => dispatch => {
    SessionUtil.login(user).then(res => {
        const { token, user } = res.data;
        if (token) {
            localStorage.setItem("jwtToken", token);
            localStorage.setItem("currentUser", JSON.stringify(user))
            SessionUtil.setAuthToken(token);
        }
        return dispatch(receiveCurrentUser(user));
    }).catch(err => dispatch(receiveErrors(err.response.data)))
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("currentUser")
    SessionUtil.logout();
    SessionUtil.setAuthToken(false);
    dispatch(logoutUser());
}