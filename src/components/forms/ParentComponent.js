/* eslint-disable prettier/prettier */
// ParentComponent.js
import React, { useState } from 'react';
import LeadSpecs from './LeadSpecs';
import OrderForm from './OrderForm';
import { useAuth } from 'src/contexts/AuthContext';

const ParentComponent = () => {
    const { user } = useAuth();
    const [leadId, setLeadId] = useState('');
    const [lastName, setLastName] = useState('');
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <LeadSpecs setLeadId={setLeadId} setLastName={setLastName} />
        <OrderForm leadId={leadId} lastName={lastName} userEmail={user.email} />
      </div>
    );
  };
  
  export default ParentComponent;