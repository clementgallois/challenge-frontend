import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Device from '../Device';

import './DeviceList.css';


class DeviceList extends PureComponent {
  render() {
    return (
      <div className="DeviceList">
        {this.props.devices.map(elem => (
          <Device
            device={elem}
            setDevice={this.props.setDevice}
          />
          ))}
      </div>
    );
  }
}

DeviceList.propTypes = {
  devices: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    last_seen: PropTypes.string,
  })).isRequired,
  setDevice: PropTypes.func.isRequired,
};

export default DeviceList;
