import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


import './Row.css';


class Row extends PureComponent {
  render() {
    const tabindex = this.props.onClick ? { tabIndex: 0 } : {};
    return (
      <div
        className={`Row ${this.props.onClick ? 'pointer' : ''} ${this.props.size}`}
        onClick={this.props.onClick || (() => {})}
        role="menuitem"
        {...tabindex}
      >
        <span className="title">{this.props.title}</span><br />
        <span className="desc">{this.props.desc}</span>
      </div>
    );
  }
}

Row.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.string,
};

Row.defaultProps = {
  title: '',
  desc: '',
  onClick: null,
  size: '',
};

export default Row;
