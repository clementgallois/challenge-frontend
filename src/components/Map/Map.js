import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import './Map.css';

const LightenColor = (percent) => {
  const color = [126, 77, 255];
  const c = Array.from(color, e => Math.round(e + ((200 - e) * (percent / 100))));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
};

class Map extends Component {
  constructor(props) {
    super(props);
    this.findCenter = this.findCenter.bind(this);
  }

  findCenter() {
    const { markers } = this.props;


    const newCenter = { lat: 0, lng: 0 };
    for (let i = 0; i < markers.length; i += 1) {
      newCenter.lat += markers[i].lat;
      newCenter.lng += markers[i].long;
    }
    newCenter.lat /= markers.length;
    newCenter.lng /= markers.length;
    return markers.length > 0 ? newCenter : this.props.center;
  }


  render() {
    const {
      markers,
      center,
      zoom,
    } = this.props;

    return (
      <GoogleMap
        // v 3.30 to avoid marker loading from corner when zooming
        bootstrapURLKeys={{ v: '3.30', key: 'AIzaSyCvGxn7SPRrtdMV-QHUqfIYUqDWR5NzIh4' }}
        center={this.findCenter()}
        defaultZoom={zoom}
        ref={(map) => { this.mapRef = map; }}
      >
        {markers &&
          markers.map((e, i) =>
            (<div
              lat={e.lat}
              lng={e.long}
              className="circle"
              style={{ background: LightenColor(i / (markers.length / 100)) }}
            />))}
      </GoogleMap>
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
  center: [48.853677, 2.342099],
  zoom: 8,
  markers: null,
};
export default Map;
