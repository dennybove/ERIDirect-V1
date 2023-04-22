/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, collection, query, where, getDocs } from 'src/firebaseConfigFile';

const ResultedLeads = () => {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      const userId = auth.currentUser.uid;
      const leadsRef = collection(db, 'users', userId, 'leads');
      const resultedLeadsQuery = query(leadsRef, where('RES-000-Active', '==', false));
      const querySnapshot = await getDocs(resultedLeadsQuery);

      const resultedLeads = [];
      querySnapshot.forEach((doc) => {
        resultedLeads.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setLeads(resultedLeads);
    };

    fetchLeads();
  }, []);

  const handleClick = (leadId) => {
    navigate(`/leads/${leadId}`);
  };

  return (
    <div>
      <h2>Resulted Leads</h2>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id} onClick={() => handleClick(lead.id)}>
            <h3>{lead['DET-003-Last Name']}</h3>
            <p>{lead['DET-001-Lead ID']}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultedLeads;
