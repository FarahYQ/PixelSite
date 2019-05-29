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
        // const photos = this
        return (
            <div>
                all the photos pleeease
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPhotos: () => dispatch(getAllPhotos())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoGallery);