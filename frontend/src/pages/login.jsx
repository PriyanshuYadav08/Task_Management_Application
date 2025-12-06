import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/axios";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/auth/login", {
        username: data.username,
        password: data.password,
      });

      // save token
      localStorage.setItem("token", res.data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      navigate("/tasks");
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid username or password";
      alert(msg);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome back</h1>
        <p className="login-sub">Sign in to continue managing your tasks.</p>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="field">
            <span className="label">Username</span>
            <input
              className={`input ${errors.username ? "input-error" : ""}`}
              type="text"
              placeholder="Your username"
              {...register("username", {
                required: "Username is required",
                minLength: { value: 3, message: "At least 3 characters" },
              })}
            />
            {errors.username && <span className="error">{errors.username.message}</span>}
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input
              className={`input ${errors.password ? "input-error" : ""}`}
              type="password"
              placeholder="Your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "At least 8 characters" },
              })}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </label>

          <button className="submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="signup-prompt">
          <span>Don't have an account?</span>
          <a href="/signup" className="signup-link">
            Sign up
          </a>
        </div>
      </div>

      <div className="login-illustration" aria-hidden="true"></div>
    </div>
  );
}