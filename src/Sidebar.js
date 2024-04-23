import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import WhatsApp from './Whatsapp';
import GRP from './GRP';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faCube, faTable, faMapMarkerAlt, faChartBar, faCalendar,
  faFile, faChevronDown, faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const user = {
  name: "Tania Andrew",
  profilePicture: "/Users/hardiparikh/kushal-ma-app/src/assets/pp.png",
};

const routes = [
  { path: "/", name: "Dashboard", icon: faTachometerAlt },
  { path: "/chats", name: "Chats", icon: faCube, dropdown: true, subRoutes: [
    { name: 'Zoom', path: '/chats/zoom' },
    { name: 'WhatsApp', path: '/chats/whatsapp' }  
  ] },
  { path: "/groups", name: "Groups", icon: faTable, dropdown: true, subRoutes: [
    { name: 'Group 1', path: '/groups/group-1' },
    { name: 'Group 2', path: '/groups/group-2' }
  ] },
  { path: "/statistics", name: "Statistics", icon: faChartBar, dropdown: true, subRoutes: [
    { name: 'Stats 1', path: '/statistics/stats-1' },
    { name: 'Stats 2', path: '/statistics/stats-2' }
  ] },
  { path: "/calendar", name: "Calendar", icon: faCalendar },
];

function Sidebar() {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const handleDropdown = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-between">
          <h5 className="brand-name">Kushal Ma</h5>
        </div>
        <hr/>
        <div className="user-section d-flex align-items-center justify-content-start">
          <img src={user.profilePicture} alt={user.name} className="user-profile-picture" />
          <span className="user-name">{user.name}</span>
        </div>
        <hr />
        <ul className="nav flex-column">
          {routes.map((route, index) => (
            <React.Fragment key={index}>
              <li className={`nav-item ${openDropdownIndex === index ? 'open' : ''}`}>
                <NavLink to={route.path} className="nav-link" activeClassName="active">
                  <FontAwesomeIcon icon={route.icon} className="nav-icon" />
                  <span className="link-text">{route.name}</span>
                </NavLink>
                {route.dropdown && (
                  <FontAwesomeIcon 
                    icon={openDropdownIndex === index ? faChevronUp : faChevronDown} 
                    onClick={() => handleDropdown(index)} 
                    className="icon-small dropdown-toggle" 
                  />
                )}
                {route.dropdown && openDropdownIndex === index && (
                  <ul className="dropdown">
                    {route.subRoutes.map((subRoute, subIndex) => (
                      <li key={subIndex}>
                        <NavLink to={subRoute.path} className="nav-link dropdown-link">
                          {subRoute.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            </React.Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
