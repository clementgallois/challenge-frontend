import React, { PureComponent } from 'react';

import './Navbar.css';

class Navbar extends PureComponent {
  render() {
    return (
      <div className="Navbar">
        <img className="Navbar-logo" src="logo.png" alt="logo" />
      </div>
    );
  }
}

export default Navbar;
