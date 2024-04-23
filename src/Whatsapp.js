import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const WhatsApp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [optionSelected, setOptionSelected] = useState(null);
  const [userData, setUserData] = useState({
    userId: '',
    userName: '',
    mobileNumber: '',
    altMobileNumber: ''
  });

  // Handles file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handles file upload
  const handleUpload = () => {
    document.getElementById('fileInput').click();
  };

  // Handles the submit action for files
  const handleSubmitFile = () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }
    // TODO: Process the file upload
    alert(`File ${selectedFile.name} is ready for submission!`);
    setSelectedFile(null);
  };

  // Handles radio button selection
  const handleOptionChange = (event) => {
    setOptionSelected(event.target.value);
    // Reset userData on option change
    setUserData({
      userId: '',
      userName: '',
      mobileNumber: '',
      altMobileNumber: ''
    });
  };

  // Handles input changes for user data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handles the submit action for manual changes
  const handleSubmitChanges = () => {
    // TODO: Process the changes based on the selected option
    alert(`Changes ready for submission: ${JSON.stringify(userData)}`);
    // Reset userData and optionSelected on submission
    setUserData({
      userId: '',
      userName: '',
      mobileNumber: '',
      altMobileNumber: ''
    });
    setOptionSelected(null);
  };

  return (
    <div>
      <Navbar />
      <Sidebar />
      <div style={{ margin: '20px' }}>
        <h1>WhatsApp Messages</h1>
        <p>Upload and submit files for processing.</p>
        <input 
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button onClick={handleUpload}>Upload</button>
        <button onClick={handleSubmitFile}>Submit</button>
        {selectedFile && <p>File ready to submit: {selectedFile.name}</p>}

        <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}> 
          
          <h3 style={{ marginTop: '20px' }}>Or</h3> 
        </div>
        
        <h2>Manually Make Changes</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}> {/* Added gap and centering */}
          <button onClick={() => setOptionSelected('group1')}>Group 1</button>
          <button onClick={() => setOptionSelected('group2')}>Group 2</button>
        </div>
        
        {optionSelected && (
          <>
            <div onChange={handleOptionChange} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <input type="radio" id="ChangeMobileNumber" value="ChangeMobileNumber" name="option" />
                <span style={{ marginLeft: '10px' }}>Change Mobile Number</span>
            </label>
            <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <input type="radio" id="AddAltMobileNumber" value="AddAltMobileNumber" name="option" />
                <span style={{ marginLeft: '10px' }}>Add Alternative Mobile Number</span>
            </label>
            <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <input type="radio" id="AddMember" value="AddMember" name="option" />
                <span style={{ marginLeft: '10px' }}>Add Member to Group</span>
            </label>
            <label style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                <input type="radio" id="RemoveMember" value="RemoveMember" name="option" />
                <span style={{ marginLeft: '10px' }}>Remove Member from a Group</span>
            </label>
            </div>

            {optionSelected && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                <input 
                  type="text"
                  name="userId"
                  placeholder="User id"
                  value={userData.userId}
                  onChange={handleInputChange}
                  style={{ width: '200px' }} // Adjusted width
                />
                <input 
                  type="text"
                  name="userName"
                  placeholder="User's name"
                  value={userData.userName}
                  onChange={handleInputChange}
                  style={{ width: '200px' }} // Adjusted width
                />
                {optionSelected !== 'AddAltMobileNumber' && (
                  <input 
                    type="tel"
                    name="mobileNumber"
                    placeholder="User's Mobile Number"
                    value={userData.mobileNumber}
                    onChange={handleInputChange}
                    style={{ width: '200px' }} // Adjusted width
                  />
                )}
                {optionSelected === 'AddAltMobileNumber' && (
                  <input 
                    type="tel"
                    name="altMobileNumber"
                    placeholder="User's Alternative Mobile Number"
                    value={userData.altMobileNumber}
                    onChange={handleInputChange}
                    style={{ width: '200px' }} // Adjusted width
                  />
                )}
                <button onClick={handleSubmitChanges}>Make Changes</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WhatsApp;