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

  // Handles file selection and immediately submits to the server
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Prepare the form data
      const formData = new FormData();
      formData.append('file', file);

      // Post the form data to the server
      fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        alert('File processed successfully!');
        console.log(data);
        setSelectedFile(null); // Clear the selected file after submission
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
  };

  // Opens file input dialog
  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  // Handles changes in option radio buttons
  const handleOptionChange = (event) => {
    setOptionSelected(event.target.value);
    setUserData({
      userId: '',
      userName: '',
      mobileNumber: '',
      altMobileNumber: ''
    });
  };

  // Handles changes in user data form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handles the submission of user data changes
  const handleSubmitChanges = () => {
    alert(`Changes ready for submission: ${JSON.stringify(userData)}`);
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
        <p>Click 'Upload' to select and submit files for processing.</p>
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <button onClick={handleUploadClick}>Upload</button>
        {selectedFile && <p>File ready to submit: {selectedFile.name}</p>}

        <div style={{ marginTop: '20px' }}> 
          <h3>Or</h3> 
        </div>
        
        <h2>Manually Make Changes</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button onClick={() => setOptionSelected('group1')}>Group 1</button>
          <button onClick={() => setOptionSelected('group2')}>Group 2</button>
        </div>

        {optionSelected && (
          <div style={{ textAlign: 'center' }}>
            <input 
              type="text"
              name="userId"
              placeholder="User ID"
              value={userData.userId}
              onChange={handleInputChange}
            />
            <input 
              type="text"
              name="userName"
              placeholder="User's Name"
              value={userData.userName}
              onChange={handleInputChange}
            />
            {optionSelected !== 'AddAltMobileNumber' && (
              <input 
                type="tel"
                name="mobileNumber"
                placeholder="Mobile Number"
                value={userData.mobileNumber}
                onChange={handleInputChange}
              />
            )}
            {optionSelected === 'AddAltMobileNumber' && (
              <input 
                type="tel"
                name="altMobileNumber"
                placeholder="Alternative Mobile Number"
                value={userData.altMobileNumber}
                onChange={handleInputChange}
              />
            )}
            <button onClick={handleSubmitChanges}>Make Changes</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsApp;
