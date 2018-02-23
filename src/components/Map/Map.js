import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import './Map.css';

const lightenColor = (percent) => {
  const color = [126, 77, 255];
  const c = Array.from(color, e => Math.round(e + ((200 - e) * (percent / 100))));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
};


class Map extends Component {
  constructor(props) {
    super(props);
    this.findBound = this.findBound.bind(this);
    this.state = { center: props.center, zoom: props.zoom };
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.markers) !== JSON.stringify(nextProps.markers)) {
      this.findBound(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const center = JSON.stringify(nextState.center) !== JSON.stringify(this.state.center);
    const zoom = nextState.zoom !== this.state.zoom;
    return center || zoom;
  }

  findBound(props) {
    const { markers } = props;
    const nw = {
      lat: Math.max(...markers.map(e => e.lat)),
      lng: Math.min(...markers.map(e => e.long)),
    };
    const se = {
      lat: Math.min(...markers.map(e => e.lat)),
      lng: Math.max(...markers.map(e => e.long)),
    };

    const size = {
      width: this.mapRef.offsetWidth,
      height: this.mapRef.offsetHeight,
    };
    const { center, zoom } = fitBounds({ nw, se }, size);
    this.setState({ center, zoom });
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
        <GoogleMap
        // v 3.30 to avoid marker loading from corner when zooming
          bootstrapURLKeys={{ v: '3.30', key: 'AIzaSyCvGxn7SPRrtdMV-QHUqfIYUqDWR5NzIh4' }}
          center={this.state.center}
          zoom={this.state.zoom}
        >
          {markers.map((e, i) =>
            (<div
              key={e.id}
              lat={e.lat}
              lng={e.long}
              className="circle"
              style={{ background: lightenColor(i / (markers.length / 100)), zIndex: markers.length - i }}
            />))}
        </GoogleMap>
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
  center: [48.853677, 2.342099],
  zoom: 8,
  markers: [],
};
export default Map;
