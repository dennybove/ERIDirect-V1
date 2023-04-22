/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, collection, setDoc, doc, Timestamp } from 'src/firebaseConfigFile';
import { CDatePicker } from '@coreui/react-pro';


const CreateLead = () => {
  const [leadId, setLeadId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [appointmentTime, setAppointmentTime] = useState(new Date());

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Retrieve the currently logged-in user's UID
    const userUid = auth.currentUser.uid;
  
    // Create the lead document in Firestore
    await setDoc(doc(db, 'users', userUid, 'leads', leadId), {
      'DET-001-Lead ID': leadId,
      'DET-002-First Name': firstName,
      'DET-003-Last Name': lastName,
      'DET-004-Address': address,
      'DET-005-Phone 1': phone1,
      'DET-006-Phone 2': phone2,
      'DET-007-Appointment Time': appointmentTime,
      'RES-000-Active': true,
    });
  
    // Redirect to the desired page after creating the lead
    navigate('/path-to-desired-page');

    console.log('Selected date and time:', appointmentTime);
  };


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="leadId">Lead ID</label>
      <input
        type="text"
        id="leadId"
        value={leadId}
        onChange={(e) => setLeadId(e.target.value)}
      />

      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <label htmlFor="address">Address</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <label htmlFor="phone1">Phone 1</label>
      <input
        type="text"
        id="phone1"
        value={phone1}
        onChange={(e) => setPhone1(e.target.value)}
      />

      <label htmlFor="phone2">Phone 2</label>
      <input
        type="text"
        id="phone2"
        value={phone2}
        onChange={(e) => setPhone2(e.target.value)}
      />

        <label htmlFor="appointmentTime">Appointment Time</label>
        <CDatePicker
          locale="en-US"
          id="appointmentTime"
          value={appointmentTime}
          onDateChange={setAppointmentTime}
          timepicker
        />

      <button type="submit">Create Lead</button>
    </form>
  );
};

export default CreateLead;