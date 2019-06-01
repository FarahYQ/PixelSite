import { RECEIVE_ALL_PHOTOS, POST_PHOTO } from '../actions/photo_actions';
import merge from 'lodash/merge';

const userPhotosReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_ALL_PHOTOS:
            return merge({}, state, action.payload.data);
        case POST_PHOTO:
            const user = 7;
            const data = action.payload.data
            data["user"] = user; 
            const subData = {};
            subData[data.id] = data;
            const newState = {};
            if (state[user] === undefined) {
                newState[user] = subData;
                return newState;
            }
            const combinedData = Object.assign(state[user], subData);
            newState[user] = combinedData;
            return newState;
        default:
            return state;
    }
}

export default userPhotosReducer;