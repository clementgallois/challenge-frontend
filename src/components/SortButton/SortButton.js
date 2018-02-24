import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


import './SortButton.css';


class SortButton extends PureComponent {
  render() {
    const {
      itemKey,
      order
    } = this.props;
    const arrow = this.props.order.order ? 'arrow down' : 'arrow up';
    return (
      <button
        className="SortButton"
        onClick={() => this.props.onClick(itemKey)}
      >
        <div style={{ position: 'relative' }}>
          Sort by {itemKey}
          <span className={order && order.key === itemKey ? arrow : ''} />
        </div>
      </button>
    );
  }
}

SortButton.propTypes = {
  itemKey: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  order: PropTypes.shape({
    key: PropTypes.string,
    order: PropTypes.bool
  }),
};

export default SortButton;
