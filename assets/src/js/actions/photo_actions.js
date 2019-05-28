import * as PhotoAPIUtil from '../utils/photo_utils';

export const POST_PHOTO = 'POST_PHOTO';
export const RECEIVE_PHOTO_ERRORS = 'RECEIVE_PHOTO_ERRORS';

// actions
export const postPhoto = payload => ({
    type: POST_PHOTO,
    payload
});

export const receivePhotoErrors = errors => ({
    type: RECEIVE_PHOTO_ERRORS,
    errors
});

// thunk functions
export const addPhoto = photo => {
    return dispatch => {
        return PhotoAPIUtil.addPhoto(photo).then(
            payload => dispatch(postPhoto(payload.data)),
            errs => dispatch(receivePhotoErrors(errs))
        );
    };
};