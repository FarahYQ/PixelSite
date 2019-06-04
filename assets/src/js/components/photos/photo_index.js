import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPhotos } from '../../actions/photo_actions';
import Masonry from 'react-masonry-component';
import Map from '../map/map';

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
                    <Link><img className="photo-index-img" src={photo.image}/></Link>
                </li>
            );
        });

        return (
            <div className="home-container">
                <Map />
                <div className="gallery-title">Gallery</div>
                <Masonry
                    className={"masonry-gallery"} // default ''
                    id="masonry-gallery"
                    elementType={'ul'} // default 'div'
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    imagesLoadedOptions={imagesLoadedOptions} // default {}
                >
                    {photoElements}
                </Masonry>
            </div>
        );
    };
};

const mapStateToProps = ({ session, entities: {userPhotos} }) => {
    const photos = userPhotos[session.id] || {};
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