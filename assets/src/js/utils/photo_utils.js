import axios from 'axios';

// Set axios default header and cookie for csrf
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export const addPhoto = (formData) => {
    return axios.post('api/gallery-view/', formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
};

export const getAllPhotos = () => {
    return axios.get('api/gallery-view/');
};