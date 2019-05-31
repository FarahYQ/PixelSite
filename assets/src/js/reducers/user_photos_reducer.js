import { RECEIVE_ALL_PHOTOS } from '../actions/photo_actions';
import merge from 'lodash/merge';

const userPhotosReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ALL_PHOTOS:
            return merge({}, state, action.payload.data);
        default:
            return state;
    }
}

export default userPhotosReducer;