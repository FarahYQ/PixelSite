import axios from 'axios';

export const signup = (userData) => {
    return axios.post('/users/register', userData)
    .then(res => res.json())
    .then(({ res }) => console.log(res))
    .catch(errs => (console.log(errs)));
};

export const login = (userData) => {
    return axios.post('/users/login', userData);
};