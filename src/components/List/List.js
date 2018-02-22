import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Row from '../Row';

import './List.css';


class List extends PureComponent {
  render() {
    return (
      <div className="List">
        {this.props.items.map(elem => (
          <Row
            title={elem[this.props.titleKey]}
            desc={elem[this.props.descKey]}
            onClick={this.props.clickHandler ? () => this.props.clickHandler(elem) : null}
            {...this.props}
          />
          ))}
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  titleKey: PropTypes.string,
  descKey: PropTypes.string,
  clickHandler: PropTypes.func,
};

List.defaultProps = {
  titleKey: 'title',
  descKey: 'desc',
  clickHandler: null,
};

export default List;
