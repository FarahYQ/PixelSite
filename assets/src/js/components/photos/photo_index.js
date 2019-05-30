import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPhotos } from '../../actions/photo_actions';

class PhotoGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    };

    componentDidMount() {
        this.props.getPhotos();
    };

    render() {
        const photosOb = this.props.photos || {}
        const photos = Object.values(photosOb) || {};
        const numPhotos = photos.length;
        const q1 = Math.ceil(numPhotos/4);
        const q2 = (numPhotos - q1)%2 == 0 ? Math.floor((numPhotos-q1)/3) : Math.ceil((numPhotos-q1)/3)
        const q3 = Math.floor((numPhotos - q2)/2);
        const q4 = numPhotos;
        const col1 = photos.slice(0,q1);
        const col2 = photos.slice(q1,q2);
        const col3 = photos.slice(q2,q3);
        const col4 = photos.slice(q3,q4+1);

        return (
            <div>
                <div className="gallery-row">
                    <div className="gallery-column">
                        {col1.map(
                            photo => <img src={`${photo.image}`}/>
                        )}
                    </div>
                    <div className="gallery-column">
                        {col2.map(
                            photo => <img src={`${photo.image}`}/>
                        )}
                    </div>
                    <div className="gallery-column">
                        {col3.map(
                            photo => <img src={`${photo.image}`}/>
                        )}
                    </div>
                    <div className="gallery-column">
                        {col4.map(
                            photo => <img src={`${photo.image}`}/>
                        )}
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = ({ session, entities: {userPhotos} }) => {
    return {
        currentUserId: session.id,
        photos: userPhotos.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPhotos: () => dispatch(getAllPhotos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);