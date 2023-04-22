/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLeadData } from 'src/contexts/leadDataContext';

const CurrentLeadInfo = () => {
  const { leadId } = useParams();
  const { leadData } = useLeadData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (leadData) {
      setIsLoading(false);
    }
  }, [leadData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Lead Information</h1>
      <p>
        <strong>Lead ID:</strong> {leadData['DET-001-Lead ID']}
      </p>
      <p>
        <strong>First Name:</strong> {leadData['DET-002-First Name']}
      </p>
      <p>
        <strong>Last Name:</strong> {leadData['DET-003-Last Name']}
      </p>
      <p>
        <strong>Address:</strong> {leadData['DET-004-Address']}
      </p>
      <p>
        <strong>Phone 1:</strong> {leadData['DET-005-Phone 1']}
      </p>
      <p>
        <strong>Phone 2:</strong> {leadData['DET-006-Phone 2']}
      </p>
      <p>
        <strong>Appointment Time:</strong>{' '}
        {new Date(leadData['DET-007-Appointment Time']).toLocaleString()}
      </p>
    </div>
  );
};

export default CurrentLeadInfo;
