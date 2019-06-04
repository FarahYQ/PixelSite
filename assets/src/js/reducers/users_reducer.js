import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

const usersReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            console.log("in usersReducer")
            console.log(action.user["id"])
            let userData = {}
            userData[action.user["id"]] = action.user
            console.log(userData)
            return merge({}, state, userData)
        default:
            return state;
    }
}

export default usersReducer;