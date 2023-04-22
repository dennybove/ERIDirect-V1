/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth, collection, setDoc, doc, Timestamp, getDoc } from 'src/firebaseConfigFile';
import { CDatePicker } from '@coreui/react-pro';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
  CTimePicker,
  CModal,
  CModalBody,
  CModalContent,
  CModalHeader,
  CModalDialog,
  CModalFooter,
  CModalTitle,
  CLoadingButton
} from '@coreui/react-pro'
import { DocsExample } from 'src/components'
import { DateTime } from 'luxon';


const CreateLead2 = () => {
  const [leadId, setLeadId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  //const [appointmentTime, setAppointmentTime] = useState(new Date());

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("10:00");

  const [visible, setVisible] = useState(false)

  const availableTimes = [
    "09:00", "11:00", "13:00", "15:00", "17:00", "19:00",
  ];
  const availableLabels = [
    "9:00 am", "11:00 am", "1:00 pm", "3:00 pm", "5:00 pm", "7:00 pm",
  ];  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Check if a lead with the same leadId already exists
      const leadDocRef = doc(db, 'users', auth.currentUser.uid, 'leads', leadId);
      const leadDocSnapshot = await getDoc(leadDocRef);

      if (leadDocSnapshot.exists()) {
        alert("A lead with the same Lead ID already exists!");
        return;
      }

     // Combine date and time inputs into a single Date object
     const combinedDateTime = new Date(date);
     const [hours, minutes] = time.split(":");
     combinedDateTime.setHours(hours);
     combinedDateTime.setMinutes(minutes);

    // Convert the local time to UTC
    //const combinedDateTimeUTC = new Date(combinedDateTime.getTime() - combinedDateTime.getTimezoneOffset() * 60000);
  
    // Retrieve the currently logged-in user's UID
    const userUid = auth.currentUser.uid;
    const userEmail = auth.currentUser.email;    
  
    // Create the lead document in Firestore
    await setDoc(doc(db, 'users', userUid, 'leads', leadId), {
      'DET-000-User ID': userEmail,
      'DET-001-Lead ID': leadId,
      'DET-002-First Name': firstName,
      'DET-003-Last Name': lastName,
      'DET-004-Address': address,
      'DET-005-Phone 1': phone1,
      'DET-006-Phone 2': phone2,
      'DET-007-Appointment Time': combinedDateTime, // Save the UTC-adjusted time
      //'DET-007-Appointment Time': combinedDateTime,
      'RES-000-Active': true,
    });
  
    // Redirect to the desired page after creating the lead
    navigate('/ActiveLeads');

    //console.log('Selected date and time:', appointmentTime);
  };


  return (

    <><CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Create New Lead</strong>
        </CCardHeader>
        <CCardBody>
            <CForm className="row g-3" onSubmit={handleSubmit}>
              <CCol md={12}>
                <CFormLabel htmlFor="leadId">Lead ID</CFormLabel>
                <CFormInput 
                  type="number"
                  id="leadId"
                  required
                  value={leadId}
                  onChange={(e) => setLeadId(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="firstName">First Name</CFormLabel>
                <CFormInput 
                  type="text"
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="lastName">Last Name</CFormLabel>
                <CFormInput 
                  type="text"
                  id="lastName"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)} />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="phone1">Phone 1</CFormLabel>
                <CFormInput 
                  type = "number" 
                  id="phone1"
                  required
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="phone2">Phone 2</CFormLabel>
                <CFormInput 
                  type="number"
                  id="phone2"
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)} />
              </CCol>

              <CCol xs={12}>
                <CFormLabel htmlFor="address">Address</CFormLabel>
                <CFormInput
                  type="text"
                  id="address"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="1234 Main St" />
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="userDate">Date</CFormLabel>
                  <CDatePicker
                  locale="en-US"
                  id="userDate"
                  required
                  value={date}
                  onDateChange={setDate} />
              </CCol>
              <CCol md={6}>
                <CFormLabel htmlFor="userTime">Time</CFormLabel>
                <CFormSelect value={time} onChange={(e) => setTime(e.target.value)}>
                <option key="9:00" value="9:00">9:00 am</option>
                <option key="11:00" value="11:00">11:00 am</option>
                <option key="13:00" value="13:00">1:00 pm</option>
                <option key="15:00" value="15:00">3:00 pm</option>
                <option key="17:00" value="17:00">5:00 pm</option>
                <option key="19:00" value="19:00">7:00 pm</option>
              </CFormSelect>
              </CCol>
              <CCol lg={12}>
                <CLoadingButton timeout={2000} type="submit" >Create Lead</CLoadingButton>
              </CCol>
            </CForm>
        </CCardBody>
      </CCard>
    </CCol>
    
</>
  );
};

export default CreateLead2;