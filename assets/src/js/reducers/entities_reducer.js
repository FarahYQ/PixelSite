import { combineReducers } from 'redux';
import userPhotos from './user_photos_reducer';
import users from './users_reducer';
import filteredPhotos from './selectedPhotos_reducer'

const entitiesReducer = combineReducers({
    users,
    userPhotos,
    filteredPhotos
});

export default entitiesReducer;

