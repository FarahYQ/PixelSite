import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPhotos } from '../../actions/photo_actions';
import Masonry from 'react-masonry-component';

class PhotoGallery extends Component {
    constructor(props) {
        super(props);
    };

    componentWillMount() {
        this.props.getPhotos();
    };

    render() {
        const masonryOptions = {
            transitionDuration: 0
        };
        const imagesLoadedOptions = { background: '.my-bg-image-el' }
        const photos = this.props.photos || [];
        const photoElements = photos.map(photo => {
            return (
                <li className="photo-index-li" key ={photo.id}>
                    <img className="photo-index-img" src={photo.image}/>
                </li>
            );
        });

        return (
            <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
                {photoElements}
            </Masonry>
        );
    };
};

const mapStateToProps = ({ session, entities: {userPhotos} }) => {
    const photos = userPhotos[7] || {};
    return {
        currentUserId: session.id,
        photos: Object.values(photos)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPhotos: () => dispatch(getAllPhotos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);