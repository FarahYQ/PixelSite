import { RECEIVE_ALL_PHOTOS, POST_PHOTO, RECEIVE_SELECTED_PHOTOS } from '../actions/photo_actions';
import merge from 'lodash/merge';

const selectedPhotosReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_SELECTED_PHOTOS:
            return action.payload.data;
        default:
            return state;
    }
}

export default selectedPhotosReducer;