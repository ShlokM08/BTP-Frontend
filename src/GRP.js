import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import PieBarInd from './PieBarInd';
import GrpMsgAct from './GrpMsgAct';

const GRP = () => {
  return (
    <div style={{ paddingLeft: '250px' }}> {/* Assuming sidebar width is 250px */}
      <Navbar />
      <Sidebar />
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Group 1</h1>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-evenly', 
        alignItems: 'flex-start', 
        flexWrap: 'wrap', // Wrap the items if the screen is too small
        margin: '20px -15px' // Adjust margin to your preference
      }}>
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '50%', padding: '0 15px' }}> {/* Adjust minWidth and maxWidth to control the size */}
          <PieBarInd />
        </div>
        <div style={{ flex: '1', minWidth: '300px', maxWidth: '50%', padding: '0 15px' }}>
          <GrpMsgAct />
        </div>
      </div>
    </div>
  );
};

export default GRP;
