import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'gatsby';

class SubListGroups extends React.Component {
  filter(kind) {
    return this.props.items.filter(item => {
      return item.kind === kind;
    });
  }

  getSubListGroupComponent(title, items) {
    const {
      selectedId
    } = this.props;

    if (items && items.length) {
      return (
        <div className="subnav-group">
          <h3 className="title">{title}</h3>
          <ul>
            {items.map((item, index) => {
              const {
                pid,
                name
              } = item;

              return (
                <li key={`nav-item-${index}`}>
                  <p className={`nav-item ellipsis${selectedId === pid ? ' selected' : ''}`}>
                    <Link to={`/${pid}`}>{name}</Link>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }

    return null;
  }

  render() {
    const {
      opened
    } = this.props;

    return (
      <div className={opened ? 'show' : 'hide'}>
        {this.getSubListGroupComponent('AUGMENTS', this.filter('augment'))}
        {this.getSubListGroupComponent('MIXES', this.filter('mix'))}
        {this.getSubListGroupComponent('STATIC PROPERTIES', this.filter('static-property'))}
        {this.getSubListGroupComponent('STATIC METHODS', this.filter('static-function'))}
        {this.getSubListGroupComponent('INSTANCE METHODS', this.filter('instance-function'))}
        {this.getSubListGroupComponent('EVENTS', this.filter('event'))}
        {this.getSubListGroupComponent('TYPEDEF', this.filter('typedef'))}
      </div>
    );
  }
}

SubListGroups.propTypes = {
  selectedId: PropTypes.string,
  name: PropTypes.string,
  opened: PropTypes.bool,
  items: PropTypes.array
};

export default SubListGroups;