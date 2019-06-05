import axios from 'axios';

// Set axios default header and cookie for csrf
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export const addPhoto = (formData) => {
    return axios.post('api/photos/', formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    });
};

export const getAllPhotos = () => {
    return axios.get('api/gallery-view/');
};

export const getSelectedPhotos = (boundaries) => {
    console.log("in the util")
    console.log({params: boundaries})
    return axios.get('api/selected-photos/', {params: boundaries});
}