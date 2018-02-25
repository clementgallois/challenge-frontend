import React, { Component } from 'react';
import PropTypes from 'prop-types';


import './Row.css';


class Row extends Component {

  componentWillReceiveProps(nextProps){
    if (this.props.hover !== nextProps.hover){
      // unsuported by firefox at the moment, use module ?
      this.ref.scrollIntoViewIfNeeded({ behavior: 'auto' });
    }
  }
  shouldComponentUpdate(nextProps){
    const title = this.props.title !== nextProps.title;
    const desc = this.props.desc !== nextProps.desc;
    const hover = this.props.hover !== nextProps.hover;
    return title || desc || hover;
  }

  render() {
    const tabindex = this.props.onClick ? { tabIndex: 0 } : {};
    return (
      <div
        ref={(n) => {this.ref = n;}}
        className={`Row ${this.props.onClick && 'pointer'} ${this.props.size} ${this.props.hover && 'rowHover'}`}
        onClick={this.props.onClick}
        onMouseEnter={this.props.hoverHandler}
        onMouseLeave={this.props.hoverHandler}
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
  hoverHandler: PropTypes.func,
  size: PropTypes.string,
  hover: PropTypes.string,
};

Row.defaultProps = {
  title: '',
  desc: '',
  onClick: null,
  hoverHandler: null,
  size: '',
  hover: null,
};

export default Row;
