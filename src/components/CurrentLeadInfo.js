/* eslint-disable prettier/prettier */
// CurrentLeadInfo.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const CurrentLeadInfo = () => {
  const location = useLocation();
  const leadData = location.state.leadData;

  return (
    <div>
      <h2>Current Lead Info</h2>
      <div>
        <h3>Lead Details:</h3>
        <p>Name: {leadData.name}</p>
        <p>Email: {leadData.email}</p>
        <p>Phone: {leadData.phone}</p>
      </div>
    </div>
  );
};

export default CurrentLeadInfo;
