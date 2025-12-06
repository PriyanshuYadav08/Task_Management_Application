// File: src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import './index.css'
import api from './api/axios'
import App from './App.jsx'

import Signup from './pages/signup.jsx'  // signup screen you added
import Login from './pages/login.jsx'
// optional placeholder pages (create simple files or replace these imports with your actual pages)

const Home = ()  => <div className="p-6">Home page</div>
const Tasks = () => <div className="p-6">Tasks page (protected)</div>

// attach token (if present) to axios default headers BEFORE rendering
const token = localStorage.getItem('token')
if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* If App contains its own Routes, you can remove nested ones below.
              These are provided so the Signup screen is directly available. */}
          <Route index element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="tasks" element={<Tasks />} />
          {/* catch-all: redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)