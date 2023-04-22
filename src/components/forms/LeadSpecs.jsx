/* eslint-disable prettier/prettier */ 
// LeadSpecs.js
import React, { useState, useEffect } from 'react';
//import { db, auth, collection, addDoc, onAuthStateChanged, getDocs, doc, getDoc, setDoc } from 'src/firebaseConfigFile';
import { db, auth, collection, addDoc, onAuthStateChanged, getDocs, doc, getDoc, setDoc } from 'src/firebaseConfigFile';
import PropTypes from 'prop-types';

const LeadSpecs = ({ setLeadId, setLastName }) => {
  const [leadId, setLeadIdLocal] = useState('');
  const [lastName, setLastNameLocal] = useState('');

  const handleLeadIdChange = (e) => {
    const newLeadId = e.target.value;
    setLeadIdLocal(newLeadId);
    setLeadId(newLeadId);
  };

  const handleLastNameChange = (e) => {
    const newLastName = e.target.value;
    setLastNameLocal(newLastName);
    setLastName(newLastName);
  };
//    const [leadId, setLeadId] = useState('');
    const [firstName, setFirstName] = useState('');
//    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneMain, setPhoneMain] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!user) {
          alert('You must be logged in to submit data.');
          return;
        }
    
        const leadSpecData = {
          firstName,
          lastName,
          address,
          phoneMain,
          appointmentDate,
          createdAt: new Date(),
          userId: user.uid,
        };
    
        try {
          const userDocRef = doc(db, 'users', user.email);
          const leadsCollectionRef = collection(userDocRef, 'leads');
          const leadDocRef = doc(leadsCollectionRef, `${lastName}-${leadId}`);
          await setDoc(leadDocRef, leadSpecData);
    
          setLeadId('');
          setFirstName('');
          setLastName('');
          setAddress('');
          setPhoneMain('');
          setAppointmentDate('');
          alert('Data written to Firestore successfully!');
        } catch (error) {
          console.error('Error writing data to Firestore:', error);
        }
      };
    
  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="leadId">Lead ID:</label>
              <input type="text" id="leadId" name="leadId" value={leadId} onChange={handleLeadIdChange} />
            </div>
            <div>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name:</label>
              <input type="text" id="lastName" name="lastName" value={lastName} onChange={handleLastNameChange} />
            </div>
            <div>
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneMain">Phone Number:</label>
              <input
                type="tel"
                id="phoneMain"
                value={phoneMain}
                onChange={(e) => setPhoneMain(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="appointmentDate">Appointment Date:</label>
              <input
                type="datetime-local"
                id="appointmentDate"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
              />
            </div>
            <button type="submit">Submit Lead Specs</button>
          </form>
        </>
      ) : (
        <p>You must be logged in to access this page.</p>
      )}
    </div>
  );
};

LeadSpecs.propTypes = {
  setLeadId: PropTypes.func.isRequired,
  setLastName: PropTypes.func.isRequired,
};

export default LeadSpecs;
