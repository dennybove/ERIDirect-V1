/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useHistory } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, collection, getDocs, query, where } from 'src/firebaseConfigFile';
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardGroup,
  CCardHeader,
  CCardImage,
  CCardLink,
  CCardSubtitle,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
  CNav,
  CNavItem,
  CNavLink,
  CCol,
  CRow,
} from '@coreui/react-pro'
import { DocsExample } from 'src/components'
import { formatTimestamp, formatDate } from 'src/utils';
import { useLeadData } from 'src/contexts/leadDataContext';


const ActiveLeads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve the currently logged-in user's UID
      const userUid = auth.currentUser.uid;

      // Get the leads for the current user with "RES-000-Active" set to true
      const leadsRef = collection(db, 'users', userUid, 'leads');
      const activeLeadsQuery = query(leadsRef, where('RES-000-Active', '==', true));
      const leadsSnapshot = await getDocs(activeLeadsQuery);
      const leadsData = leadsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update the state with the fetched leads
      setLeads(leadsData);
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleClick = (lead) => {
    navigate(`/leads/${lead.id}`, { state: { leadData: lead } });
  };

  return (
    <div>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Active Leads</strong>
        </CCardHeader>
        {leads.map((lead) => (
          <>
          <CCardBody>
          <div className="center-container">
          <CCard style={{ width: "100%", maxWidth: "60%" }}>
            <CCardBody>
              <CCardTitle>{lead['DET-003-Last Name']} - {lead['DET-001-Lead ID']}</CCardTitle>
              <CCardText>
                {lead['DET-002-First Name']} {lead['DET-003-Last Name']} <br />
                {formatDate(lead['DET-007-Appointment Time'])} - {formatTimestamp(lead['DET-007-Appointment Time'])}<br />
              </CCardText>
              <div className="center-container">
              <CButton style={{ width: "80%" }} onClick={() => handleClick(lead.id)}>Edit Lead - {lead['DET-001-Lead ID']}</CButton>
              </div>
            </CCardBody>
          </CCard>
          </div>
          </CCardBody>
            <br />
          </>       
        ))}
      </CCard>
    </div>
  );
};

export default ActiveLeads;
