import axios from 'axios';

// Set axios default header and cookie for csrf
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export const addPhoto = (formData) => {
    return axios.post('gallery/upload', formData, {
        headers: {
            'content-type': 'multipart/form-data'
        }})
        .then(
            res => {
                console.log(res)
                console.log("helllo success")
            }).catch(errors => {
            console.log("hellllooooo errors!")
            console.log("errors are:", errors.response.status);
        })
}