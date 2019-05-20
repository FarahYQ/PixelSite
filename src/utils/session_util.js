import axios from 'axios';

export const signup = (userData) => {
    return axios.post('/users/register', userData);
};

export const login = (userData) => {
    return axios.post('/users/login', userData);
};