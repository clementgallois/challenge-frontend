import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


import './Device.css';


class Device extends PureComponent {
  render() {
    const date = new Date(this.props.device.last_seen);

    return (
      <div className="Device" onClick={() => { this.props.setDevice(this.props.device.id); }}>
        <span className="deviceName">{this.props.device.name}</span><br />
        <span className="deviceLastSeen">{`Last seen: ${date.toDateString()} at ${date.toLocaleTimeString('fr-FR')}`}</span>
      </div>
    );
  }
}

Device.propTypes = {
  device: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    last_seen: PropTypes.string,
  }).isRequired,
};

export default Device;
