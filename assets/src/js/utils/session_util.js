import axios from 'axios';

// Set axios default header and cookie for csrf
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export const signup = (userData) => {
    return axios.post('/users/register', userData)
};

export const login = (userData) => {
    return axios.post('/users/login', userData)
};