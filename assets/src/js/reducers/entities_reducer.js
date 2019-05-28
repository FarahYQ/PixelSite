import { combineReducers } from 'redux';
import userPhotos from './user_photos_reducer';
import users from './users_reducer';

const entitiesReducer = combineReducers({
    users,
    userPhotos
});

export default entitiesReducer;

