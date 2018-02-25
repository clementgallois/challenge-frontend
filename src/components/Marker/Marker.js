import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './Marker.css';

const lightenColor = (percent) => {
  const color = [126, 77, 255];
  const c = Array.from(color, e => Math.round(e + ((200 - e) * (percent / 100))));
  return `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
};


class Marker extends Component {
  shouldComponentUpdate(nextProps){
    const zindex = this.props.zindex !== nextProps.zindex;
    const color = this.props.color !== nextProps.color;
    const hover = this.props.hover !== nextProps.hover;
    return zindex || color || hover;
  }

  render() {
    const {
      color,
      hover,
      zindex
    } = this.props;
    return (
      <div
        className={`circle ${hover ? 'hover' : ''}`}
        style={{ background: lightenColor(color), zIndex: zindex }}
      />
    );
  }
}

Marker.propTypes = {
  hover: PropTypes.bool,
  color: PropTypes.number,
  zindex: PropTypes.number,
};

Marker.defaultProps = {
  hover: false,
  color: 0,
  zindex: 0,
};

export default Marker;
