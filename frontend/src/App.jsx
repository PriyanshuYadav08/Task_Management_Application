// File: src/App.jsx
import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import api from "./api/axios";

export default function App() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(Boolean(localStorage.getItem("token")));

    // Keep auth state in sync if another tab changes localStorage
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "token") {
                setIsAuthenticated(Boolean(e.newValue));
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    // Optional: verify token quickly on mount (best-effort)
    useEffect(() => {
        let mounted = true;
        async function verify() {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                return;
            }
            try {
                // lightweight probe — your backend can expose /auth/me or /ping
                await api.get("/auth/me");
                if (mounted) setIsAuthenticated(true);
            } catch (err) {
                // invalid token -> clear
                localStorage.removeItem("token");
                delete api.defaults.headers.common["Authorization"];
                if (mounted) setIsAuthenticated(false);
            }
        }
        verify();
        return () => {
            mounted = false;
        };
    }, []);

    function logout() {
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        setIsAuthenticated(false);
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="text-lg font-bold text-indigo-600">Task App</Link>
                            <nav className="hidden sm:flex gap-3 text-sm">
                                <Link to="/" className="px-2 py-1 hover:underline">Home</Link><br></br>
                                <Link to="/tasks" className="px-2 py-1 hover:underline">Tasks</Link>
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                            {isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => navigate("/tasks")}
                                        className="px-3 py-1 rounded-md bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100"
                                    >
                                        My Tasks
                                    </button>
                                    <button
                                        onClick={logout}
                                        className="px-3 py-1 rounded-md border border-gray-200 text-sm hover:bg-gray-50"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/signup"
                                        className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
                                    >
                                        Sign up
                                    </Link><br></br>
                                    <Link
                                        to="/login"
                                        className="px-3 py-1 rounded-md border border-gray-200 text-sm hover:bg-gray-50"
                                    >
                                        Sign in
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* The child routes from main.jsx render here */}
                <Outlet />
            </main>

            <footer className="border-t mt-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 flex justify-between">
                    <div>© {new Date().getFullYear()} Task App</div>
                    <div>
                        <a className="hover:underline mr-3" href="#" onClick={(e) => e.preventDefault()}>
                            Privacy
                        </a>
                        <a className="hover:underline" href="#" onClick={(e) => e.preventDefault()}>
                            Terms
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}