import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Map.css';

const API_KEY = 'AIzaSyCvGxn7SPRrtdMV-QHUqfIYUqDWR5NzIh4';

let google = null;

class Map extends Component {
  /* load the map script only when needed */
  loadGoogleApi() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;

    script.onload = () => {
      google = window.google;

      let mapOptions = {
        zoom: this.props.zoom,
        center: this.props.center,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        // activation of the styling let the google logo to be white (which i find better)
        styles: [
          { elementType: 'labels.text.fill', stylers: [{ color: '#000000' }] },
        ]
      };
      google.maps.Map(this.mapRef, mapOptions);
    };
    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadGoogleApi();
  }

  addMarkers(nextProps){
    const { markers } = nextProps;

    let mark = new google.maps.LatLng(52.106834, -2.3305105);
    let bounds = new google.maps.LatLngBounds();
    console.log(mark);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.markers) !== JSON.stringify(nextProps.markers)) {
      this.addMarkers(nextProps);
    }
  }

  render() {
    const {
      markers,
    } = this.props;

    return (
      <div
        style={{ width: '100%', height: '100%' }}
        ref={(map) => { this.mapRef = map; }}
      >
      </div>
    );
  }
}

Map.propTypes = {
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
  markers: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })),
};

Map.defaultProps = {
  // default to france center
  center: { lat: 46.2276, lng: 2.2137 },
  zoom: 6,
  markers: [],
};
export default Map;
