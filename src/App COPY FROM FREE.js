import React, { useEffect, useState } from 'react'
import { HashRouter, Route, Routes, Outlet } from 'react-router-dom'
import './scss/style.scss'
import { FirebaseApp } from 'firebase/app'
import ProtectedRoute from './views/pages/login/ProtectedRoute'
import { auth } from 'src/firebaseConfigFile'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { signOut } from 'firebase/auth'
import { getAuth } from 'firebase/auth'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './contexts/AuthContext'

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

/* function ProtectedRoutes() {
  const [user, setUser] = useState(null) */

function ProtectedRoutes() {
  const [user, setUser] = useState(null)
  const { currentUser } = useAuth()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    user,
    currentUser ? (
      <Routes>
        <Route index element={<DefaultLayout />} />
        <Route path="*" element={<DefaultLayout />} />
      </Routes>
    ) : (
      <Login />
    )
  )
}

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/404" element={<Page404 />} />
            <Route path="/500" element={<Page500 />} />
            <Route path="*" element={<ProtectedRoutes />} />
          </Routes>
        </React.Suspense>
      </HashRouter>
    </AuthProvider>
  )
}

export default App
