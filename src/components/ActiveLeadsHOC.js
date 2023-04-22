/* eslint-disable prettier/prettier */
import React from 'react';
import ActiveLeadsPage from 'src/views/pages/eridirect/ActiveLeads';
import { LeadDataProvider } from 'src/contexts/leadDataContext';

const ActiveLeadsHOC = () => {
  return (
    <LeadDataProvider>
      <ActiveLeadsPage />
    </LeadDataProvider>
  );
};

export default ActiveLeadsHOC;
