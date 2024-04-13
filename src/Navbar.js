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
      {/* Left-aligned items */}
      <div className="navbar-brand">
        {/* Logo or Brand Icon here */}
        <img src="/Users/hardiparikh/kushal-ma-app/src/assets/logo.png" alt="Kushal Ma" className="navbar-logo" />
      </div>

      {/* Search bar */}
      <div className="navbar-search">
        <FontAwesomeIcon icon={faSearch} />
        <input type="text" placeholder="Search..." />
      </div>

      {/* Right-aligned items */}
      <div className="navbar-right">
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
