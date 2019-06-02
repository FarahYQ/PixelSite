import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { getAllPhotos } from '../../actions/photo_actions';

const mapCenter = { lat: 37.7758, lng: -122.435 };

class Map extends Component {
    constructor(props) {
        super(props);
        this.addMarker = this.addMarker.bind(this);
    }

    componentWillMount() {
        this.props.getPhotos();
    };

    componentDidMount() {
        const map = ReactDOM.findDOMNode(this.refs.map);

        const options = {
            center: new google.maps.LatLng(0, 0),
            zoom: 2,
            minZoom: 2
        };

        this.map = new google.maps.Map(map, options);

        // listen for move
        this.listenForMove();
    }

    componentWillReceiveProps() {
        this.props.photos.forEach(this.addMarker);
    }

    addMarker(spot) {
        const pos = new google.maps.LatLng(spot.lat, spot.lng);
        const marker = new google.maps.Marker({
            position: pos,
            map: this.map
        });

        // when the marker is clicked on, alert the name
        marker.addListener('click', () => {
            alert(`clicked on: ${spot.caption}`);
        });
    }

    listenForMove() {
        google.maps.event.addListener(this.map, 'idle', () => {
            const bounds = this.map.getBounds();    
        console.log('center',
            bounds.getCenter().lat(), 
            bounds.getCenter().lng());
        console.log("north east",
            bounds.getNorthEast().lat(), 
            bounds.getNorthEast().lng());
        console.log("south west",
            bounds.getSouthWest().lat(), 
            bounds.getSouthWest().lng());
        });
    }

    render() {
        return (
            <div>
                <div className="map-title">PHOTO MAP</div>
                <div id='map' ref='map'/>
            </div>
        );
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
