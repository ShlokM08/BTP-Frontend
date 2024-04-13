import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InfoBox = ({ icon, title, subtitle }) => {
  return (
    <div className="info-box">
      <FontAwesomeIcon icon={icon} size="2x" />
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default InfoBox;
