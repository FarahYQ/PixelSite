import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPhotos } from '../../actions/photo_actions';
import Masonry from 'react-masonry-component';
import Map from '../map/map';

class PhotoGallery extends Component {
    constructor(props, context) {
        super(props, context);
    };

    componentWillMount() {
        this.props.getPhotos();
    };

    // componentWillReceiveProps(nextProps) {
    //     console.log("received")
    // }

    render() {
        const masonryOptions = {
            transitionDuration: 0
        };
        const imagesLoadedOptions = { background: '.my-bg-image-el' }
        let photos;
        if (this.props.filter === undefined || this.props.filter.length === 0) {
            photos = Object.values(this.props.photos) || [];
            console.log(photos)
        } else {
            photos = this.props.filter.reduce((result, filterData) => {
                const photoId = filterData["id"];
                if (this.props.photos[photoId]) {
                    result.push(this.props.photos[photoId]);
                }
                return result;
            }, []);
        }
        
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

// PhotoGallery.propTypes = {
//     filter: PropTypes.bool.isRequired
// };

const mapStateToProps = ({ session, entities: {userPhotos, filteredPhotos} }) => {
    const photos = userPhotos[session.id] || {};
    return {
        currentUserId: session.id,
        photos: photos,
        filter: filteredPhotos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPhotos: () => dispatch(getAllPhotos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);