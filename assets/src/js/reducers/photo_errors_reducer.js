import { RECEIVE_PHOTO_ERRORS, CLEAR_PHOTO_ERRORS } from '../actions/photo_actions';

const photoErrorsReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_PHOTO_ERRORS:
            return action.errors.response;
        case CLEAR_PHOTO_ERRORS:
            return {};
        default:
            return state;
    }
}

export default photoErrorsReducer;
