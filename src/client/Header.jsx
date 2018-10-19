import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.PureComponent {
  render() {
    return (
      <div className="Header pad-left-xl">
        <a href="/userList">
        </a>
        <span className="Header-name text-size-xxl txt-blue margin-left-md">
          {this.props.userName}
        </span>
      </div>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string,
};

Header.defaultProps = {
  userName: '',
};

export default Header;
