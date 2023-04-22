/* eslint-disable prettier/prettier */
import React, { Component, Suspense } from 'react'
import { HashRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import './scss/style.scss'
import CurrentLeadInfo from './components/CurrentLeadInfo'
import { LeadDataProvider } from './contexts/leadDataContext'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

// Email App
const EmailApp = React.lazy(() => import('./views/apps/email/EmailApp'))

function PrivateRoute() {
  const [authReady, setAuthReady] = React.useState(false)
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setAuthReady(true)
    })

    return () => unsubscribe()
  }, [])

  if (!authReady) {
    return loading
  }

  return user ? <Outlet /> : <Navigate to="/login" />
}

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
        <LeadDataProvider>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="/apps/email/*" name="Email App" element={<PrivateRoute><EmailApp /></PrivateRoute>} />
            <Route path="*" name="Home" element={<PrivateRoute><DefaultLayout /></PrivateRoute>} />
            <Route path="/leads/:leadId" component={CurrentLeadInfo} />
          </Routes>
          </LeadDataProvider>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
