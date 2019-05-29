import { RECEIVE_ALL_PHOTOS } from '../actions/photo_actions';

const userPhotosReducer = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_ALL_PHOTOS:
            return { user: action.payload.data}
        default:
            return state;
    }
}

export default userPhotosReducer;