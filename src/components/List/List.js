import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Row from '../Row';

import './List.css';

function checkDate(str) {
  const date = moment(str, moment.ISO_8601, true);

  if (date.isValid()) {
    return `${date.format('DD/MM/YY')} at ${date.format('HH:mm:ss')}`;
  }
  return str;
}

class List extends PureComponent {
  render() {
    const {
      titleKey,
      descKey,
      items,
    } = this.props;
    return (
      <div className="List">
        {items.map((elem) => (
          <Row
            key={elem.id}
            title={elem[titleKey]}
            desc={checkDate(elem[descKey])}
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
