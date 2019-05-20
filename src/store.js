import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/root_reducer';

let initialState = {};

const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger)
  )

export default store;