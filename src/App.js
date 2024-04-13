import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';
import HomePage from './HomePage';

function App() {
  const [activeTab, setActiveTab] = useState('login');

  // We will create a Layout component that will conditionally render the tabs
  const Layout = () => {
    const location = useLocation(); // This hook is used inside a component now
    const showTabs = location.pathname === '/' || location.pathname === '/signup';
    
    return (
      <>
        {showTabs && (
          <div className="tabs">
            <div className={activeTab === 'login' ? 'active-tab' : 'inactive-tab'} onClick={() => setActiveTab('login')}>LOGIN</div>
            <div className={activeTab === 'signup' ? 'active-tab' : 'inactive-tab'} onClick={() => setActiveTab('signup')}>SIGNUP</div>
          </div>
        )}
      </>
    );
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* The Layout component will be rendered on every route, but it will only display the tabs on '/' and '/signup' */}
          <Route path="/" element={<><Layout /><Login /></>} />
          <Route path="/signup" element={<><Layout /><SignUp /></>} />
          <Route path="/HomePage" element={<HomePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;