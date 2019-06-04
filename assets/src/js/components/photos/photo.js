import React, { Component } from 'react';
import { connect } from 'react-redux';

class PhotoPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const photoId = this.props.match.params.photoId;
        
      }

    render() {
        const photoId = this.props.match.params.photoId;
        const source = this.props.photos[photoId].image
        return (
            <div>
                <img className="photo-image" src={source}/>
            </div>
        )
    }
}

const mapStateToProps = ({ session, entities: {userPhotos} }) => {
    const photos = userPhotos[session.id] || {};
    return {
        currentUser: session.id,
        photos: Object.values(photos)
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoPage);