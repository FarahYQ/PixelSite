import { RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';
// State for no current logged in user. This is the default.
const _nullUser = Object.freeze({
    id: null,
    isAuthenticated: false,
});


const sessionReducer = (state = _nullUser, action) => {
switch(action.type) {
    case RECEIVE_CURRENT_USER:
        return Object.freeze({ id: action.user["id"], isAuthenticated: true });
    case LOGOUT_CURRENT_USER:
        return _nullUser;
    default:
        return state;
    }
}

export default sessionReducer;