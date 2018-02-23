import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from '../Row';

import './List.css';

function checkDate(str) {
  const date = moment(str, moment.ISO_8601, true);

  if (date.isValid()) {
    return `${date.format('L')} at ${date.format('HH:mm:ss')}`;
  }
  return str;
}

class List extends PureComponent {
  render() {
    return (
      <div className="List">
        {this.props.items.map((elem) => (
          <Row
            key={elem.id}
            title={elem[this.props.titleKey]}
            desc={checkDate(elem[this.props.descKey])}
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
