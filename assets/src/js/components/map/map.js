import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getAllPhotos, getSelectedPhotos } from '../../actions/photo_actions';
const mapCenter = { lat: 37.7758, lng: -122.435 };
class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            center: { lat: 0, lng: 0 }
        }
        this.addMarker = this.addMarker.bind(this);
    }

    componentWillMount() {
        this.props.getPhotos();
    };

    componentDidMount() {
        const map = ReactDOM.findDOMNode(this.refs.map);

        const options = {
            center: this.state.center,
            zoom: 2,
            minZoom: 2
        };

        this.map = new google.maps.Map(map, options);

        // listen for move
        this.listenForMove();
    }

    componentWillReceiveProps() {
        if (this.props.filter === undefined || this.props.filter.length === 0) {
            Object.values(this.props.photos).forEach(this.addMarker);
        } else {
            this.props.filter.forEach(filterData => {
                const photoId = filterData["id"];
                this.addMarker(this.props.photos[photoId])
            })
        }
    }

    addMarker(spot) {
        let pos;
        if (spot && spot.lat && spot.lng) {
            pos = new google.maps.LatLng(spot.lat, spot.lng);
        } else if (spot && spot.geo_location[0] !== 0 && spot.geo_location[1] !== 0) {
            let lat = spot.geo_location[1];
            let lng = spot.geo_location[0];
            pos = new google.maps.LatLng(lat, lng);
        } else {
            return;
        }
        const marker = new google.maps.Marker({
            position: pos,
            map: this.map
        });

        // when the marker is clicked on, alert the name
        // marker.addListener('click', () => {
        //     alert(`clicked on: ${spot.caption}`);
        // });
    }

    listenForMove() {
        google.maps.event.addListener(this.map, 'idle', () => {
            const bounds = this.map.getBounds();
            let boundaries = {};
            boundaries['lowerLat'] = bounds.getSouthWest().lat();
            boundaries['upperLat'] = bounds.getNorthEast().lat();
            boundaries['leftLng'] = bounds.getSouthWest().lng();
            boundaries['rightLng'] = bounds.getNorthEast().lng();
            // if (boundaries['rightLng'] < boundaries['leftLng']) {
            //     boundaries['rightLng'] = 169.98046875;
            // }
            // if (boundaries['leftLng'] > boundaries['rightLng']) {
            //     boundaries['leftLng'] = -169.98046875;
            // }
            this.props.getInBoundaryPhotos(boundaries)
        });
    }

    render() {
        return (
            <div>
                <div className="map-intro">
                    <span className="map-title">PHOTO MAP</span>
                    <span className="map-instructions">
                        <div>This is a map of all your uploaded photos with location data.</div>
                        <div>Pan, zoom in, or zoom out to select region.</div>
                        <div>Only the photos that lie within that region will show up below!</div>
                    </span>
                </div>
                <div id='map' ref='map'/>
            </div>
        );
    }
}

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
        getPhotos: () => dispatch(getAllPhotos()),
        getInBoundaryPhotos: (boundaries) => dispatch(getSelectedPhotos(boundaries))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
