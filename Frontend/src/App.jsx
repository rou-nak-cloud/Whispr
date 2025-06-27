import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader } from 'lucide-react'

import Navbar from './components/Navbar'

import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

import { useAuthStore } from './store/useAuthStore'

import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers })

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);

  // console.log({ authUser} );

  if(isCheckingAuth && !authUser)
    return (
    <div className='flex items-center justify-center h-screen'>
      <Loader  className='size-7 animate-spin' />
    </div>
    )

  

  return (
    <div> 
  
       < Navbar />

       <Routes>
          <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
          <Route path='/signUp' element={!authUser ? <SignUpPage /> : <Navigate  to="/" />} />
          {/* !authUser in sign up page */}
          <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
          <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path='/settings' element={ <SettingsPage />} />
       </Routes>

       <Toaster />
    </div>
  )
}

export default App
