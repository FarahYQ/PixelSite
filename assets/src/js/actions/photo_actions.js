import * as PhotoAPIUtil from '../utils/photo_utils';

export const POST_PHOTO = 'POST_PHOTO';
export const RECEIVE_PHOTO_ERRORS = 'RECEIVE_PHOTO_ERRORS';
export const RECEIVE_ALL_PHOTOS = 'RECEIVE_ALL_PHOTOS';
export const CLEAR_PHOTO_ERRORS = 'CLEAR_PHOTO_ERRORS';
export const RECEIVE_SELECTED_PHOTOS = 'RECEIVE_SELECTED_PHOTOS';

// actions
export const postPhoto = payload => ({
    type: POST_PHOTO,
    payload
});

export const receivePhotoErrors = errors => ({
    type: RECEIVE_PHOTO_ERRORS,
    errors
});

export const clearPhotoErrors = () => ({
    type: CLEAR_PHOTO_ERRORS
})

export const receiveAllPhotos = payload => ({
    type: RECEIVE_ALL_PHOTOS,
    payload
})

export const receiveSelectedPhotos = payload => ({
    type: RECEIVE_SELECTED_PHOTOS,
    payload
})

// thunk functions
export const addPhoto = photo => {
    return dispatch => {
        return PhotoAPIUtil.addPhoto(photo).then(
            payload => (
                dispatch(postPhoto(payload))
            )
        );
    };
};

export const getAllPhotos = () => {
    return dispatch => {
        return PhotoAPIUtil.getAllPhotos().then(
            payload => dispatch(receiveAllPhotos(payload))
        );
    };
};

export const getSelectedPhotos = boundaries => {
    return dispatch => {
        return PhotoAPIUtil.getSelectedPhotos(boundaries).then(
            payload => dispatch(receiveSelectedPhotos(payload))
        ); 
    };
};

