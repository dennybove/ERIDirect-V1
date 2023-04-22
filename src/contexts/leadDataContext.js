/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { db, doc, getDoc } from 'src/firebaseConfigFile';

const LeadDataContext = createContext();

export const LeadDataProvider = ({ children }) => {
  const { leadId } = useParams();
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (leadId) {
        const userUid = 'hf4eMF1Ac1UV4hqatxwH8l9X9uV2';
        const leadDoc = await getDoc(doc(db, 'users', userUid, 'leads', leadId));
        setLeadData(leadDoc.data());
      }
    };

    fetchData();
  }, [leadId]);

  return (
    <LeadDataContext.Provider value={{ leadData }}>
      {children}
    </LeadDataContext.Provider>
  );
};

LeadDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLeadData = () => {
  const context = useContext(LeadDataContext);
  if (context === undefined) {
    throw new Error('useLeadData must be used within a LeadDataProvider');
  }
  return context;
};
