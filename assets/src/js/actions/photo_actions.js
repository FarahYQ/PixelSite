import * as PhotoAPIUtil from '../utils/photo_utils';

export const POST_PHOTO = 'POST_PHOTO';
export const RECEIVE_PHOTO_ERRORS = 'RECEIVE_PHOTO_ERRORS';
export const RECEIVE_ALL_PHOTOS = 'RECEIVE_ALL_PHOTOS';

// actions
export const postPhoto = payload => ({
    type: POST_PHOTO,
    payload
});

export const receivePhotoErrors = errors => ({
    type: RECEIVE_PHOTO_ERRORS,
    errors
});

export const receiveAllPhotos = payload => ({
    type: RECEIVE_ALL_PHOTOS,
    payload
})

// thunk functions
export const addPhoto = photo => {
    return dispatch => {
        return PhotoAPIUtil.addPhoto(photo).then(
            payload => dispatch(postPhoto(payload)),
            errs => dispatch(receivePhotoErrors(errs))
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
