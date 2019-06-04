import axios from 'axios';

// Set axios default header and cookie for csrf
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export const signup = (userData) => {
    return axios.post('api/user/register/', userData);
};

export const login = (userData) => {
    return axios.post('api/user/login/', userData)
};

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    };
};

export const logout = token => {
    return axios.post('api/user/logout/');
};