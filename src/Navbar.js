// Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faBell, faEnvelope, faQuestionCircle, faCog, faLock, faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Right-aligned items */}
      <div className="navbar-search">
        <FontAwesomeIcon icon={faSearch} className="navbar-icon" />
        <input type="text" placeholder="Search..." className="search-input" />
        <FontAwesomeIcon icon={faEnvelope} className="navbar-icon" />
        <FontAwesomeIcon icon={faBell} className="navbar-icon" />
        <FontAwesomeIcon icon={faCog} className="navbar-icon" />
        {/* Profile and logout dropdown, assuming a component <ProfileDropdown /> */}
        {/* <ProfileDropdown /> */}
      </div>
    </nav>
  );
};

export default Navbar;
