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
import CreateLead from 'src/components/CreateLead'
import ActiveLeads from 'src/components/ActiveLeadsList'
import ResultedLeads from 'src/components/ResultedLeadsList'

const ResultedLeadsPage = () => {
  return (
    <>
      <ResultedLeads />
    </>
  )
}

export default ResultedLeadsPage
