import React from 'react';
import InfoBox from './Infobox';
import LineChart from './LineChart';
import BarChart from './BarChart';
import { faServer, faShoppingCart, faUser, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Information Boxes */}
      <div className="info-boxes">
        <InfoBox icon={faServer} title="Number" subtitle="150GB" />
        <InfoBox icon={faShoppingCart} title="Revenue" subtitle="$1,345" />
        <InfoBox icon={faUser} title="Errors" subtitle="23" />
        <InfoBox icon={faExclamationTriangle} title="Followers" subtitle="+45K" />
      </div>

      {/* Graphs */}
      <div className="graphs">
        <LineChart />
        <BarChart />
      </div>

      {/* Task List Here */}

    </div>
  );
};

export default Dashboard;
