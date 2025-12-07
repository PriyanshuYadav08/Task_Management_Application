import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  async function onSubmit(data) {
    try {
      const res = await api.post("/auth/login", { username: data.username, password: data.password });
      const token = res?.data?.token;
      if (!token) {
        alert("Login failed: no token received");
        return;
      }
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      navigate("/tasks");
    } catch (err) {
      alert(err?.response?.data?.message || "Login failed");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome back</h1>
        <p className="login-sub">Sign in to continue managing your tasks.</p>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="field">
            <span className="label">Username</span>
            <input className={`input ${errors.username ? "input-error" : ""}`} type="text" placeholder="Your username"
              {...register("username", { required: "Username required", minLength: 3 })} />
            {errors.username && <span className="error">{errors.username.message}</span>}
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input className={`input ${errors.password ? "input-error" : ""}`} type="password" placeholder="Your password"
              {...register("password", { required: "Password required", minLength: 8 })} />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </label>

          <button className="submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="signup-prompt">
          <span>Don't have an account?</span>
          <a href="/signup" className="signup-link">Sign up</a>
        </div>
      </div>
    </div>
  );
}