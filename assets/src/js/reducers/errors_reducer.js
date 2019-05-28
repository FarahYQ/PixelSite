import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import photos from './photo_errors_reducer';

const errorsReducer = combineReducers({
    photos,
    session
});

export default errorsReducer;