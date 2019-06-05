import { RECEIVE_ALL_PHOTOS, POST_PHOTO } from '../actions/photo_actions';
import merge from 'lodash/merge';

const userPhotosReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ALL_PHOTOS:
            return merge({}, state, action.payload.data);
        case POST_PHOTO:
            // const subData = {};
            // const user = action.payload.data.user;
            // subData[action.payload.data["id"]] = action.payload.data;
            // const combinedData = Object.assign(state[user], subData);
            // const newState = {};
            // newState[user] = combinedData;
            return state;
        default:
            return state;
    }
}

export default userPhotosReducer;