import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import api from "./api/axios";

export default function App() {
  const navigate = useNavigate();
  const token = Boolean(localStorage.getItem("token"));

  function logout() {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    navigate("/login");
  }

  return (
    <div>
      <header className="topnav">
        <div className="container">
          <div className="brand"><Link to="/">TaskApp</Link></div>
          <nav>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/tasks" className="nav-link">Tasks</Link>
            {!token ? (
              <>
                <Link to="/signup" className="btn">Sign up</Link>
                <Link to="/login" className="btn ghost">Sign in</Link>
              </>
            ) : (
              <button onClick={logout} className="btn ghost">Logout</button>
            )}
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">© {new Date().getFullYear()} Task Management App</div>
      </footer>
    </div>
  );
}