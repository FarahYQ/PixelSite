import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/App';
import configureStore from './store';
import '../scss/index.scss';
import { setAuthToken } from './utils/session_util';
import { logout } from './actions/session_actions';

document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (localStorage.jwtToken && localStorage.currentUser) {
        setAuthToken(localStorage.jwtToken);
        const userData = JSON.parse(localStorage.currentUser)
        const currentUser = {};
        currentUser[userData.id] = userData
        const preloadedState = {
            session: { id: userData.id , isAuthenticated: true},
            entities: {
              users: currentUser
            }
          };
        store = configureStore(preloadedState);
    } else {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("currentUser")
        store = configureStore();
    }

    ReactDOM.render(<Root store={store}/>, document.getElementById("app"));
})
