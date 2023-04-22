import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
} from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import MultiplicationForm from 'src/components/TestForm'
import SalesOrderForm from 'src/components/forms/LeadSpecs'
import ParentComponent from 'src/components/forms/ParentComponent'
import { useAuth } from 'src/contexts/AuthContext'
import { RedirectFunction } from 'react-router-dom'
import CreateLead2 from 'src/components/CreateLead copy'
import ActiveLeads from 'src/components/ActiveLeadsList'

const NewLead = () => {
  return <CreateLead2 />
}

export default NewLead
