import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./styles/index.css";

import App from "./App.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Tasks from "./pages/tasks.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import api from "./api/axios";

// attach token if present
const token = localStorage.getItem("token");
if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<div style={{padding:20}}>Welcome to TaskApp — use the nav to signup or login.</div>} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route
            path="tasks"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);