import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import Marker from '../Marker';
import './Map.css';

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
    const hover = nextProps.hover !== this.props.hover;

    return hover || center || zoom;
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

  handleHover(e){
    if (!this.state.hover)
    {
      this.setState({ hover: e });
    }
    else {
      this.setState({ hover: null });
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
        <GoogleMap
        // v 3.30 to avoid marker loading from corner when zooming
          bootstrapURLKeys={{ v: '3.30', key: 'AIzaSyCvGxn7SPRrtdMV-QHUqfIYUqDWR5NzIh4' }}
          center={this.state.center}
          zoom={this.state.zoom}
          hoverDistance={this.props.hover ? 20 : 10}
          onChildMouseEnter={this.props.enterMarker}
          onChildMouseLeave={this.props.leaveMarker}
        >
          {markers.map((e, i) =>
            (<Marker
              key={e.id}
              lat={e.lat}
              lng={e.long}
              color={i / (markers.length / 100)}
              zindex={markers.length - i}
              hover={this.props.hover === e.id}
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
  hover: PropTypes.string,
  enterMarker: PropTypes.func,
  leaveMarker: PropTypes.func,
};

Map.defaultProps = {
  center: [48.853677, 2.342099],
  zoom: 8,
  markers: [],
  hover: null,
  enterMarker: null,
  leaveMarker: null
};
export default Map;
