import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors, isSubmitting }, reset } = useForm();
  const password = watch("password", "");

  async function onSubmit(data) {
    try {
      await api.post("/auth/register", { username: data.username, password: data.password });

      // auto-login
      const res = await api.post("/auth/login", { username: data.username, password: data.password });
      const token = res?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      navigate("/tasks");
    } catch (err) {
      alert(err?.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1 className="signup-title">Create an account</h1>
        <p className="signup-sub">Sign up to manage your tasks securely.</p>

        <form className="signup-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="field">
            <span className="label">Username</span>
            <input className={`input ${errors.username ? "input-error" : ""}`} type="text" placeholder="Choose a username"
              {...register("username", { required: "Username required", minLength: 3 })} />
            {errors.username && <span className="error">{errors.username.message}</span>}
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input className={`input ${errors.password ? "input-error" : ""}`} type="password" placeholder="Create a strong password"
              {...register("password", { required: "Password required", minLength: 8 })} />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </label>

          <label className="field">
            <span className="label">Confirm password</span>
            <input className={`input ${errors.confirmPassword ? "input-error" : ""}`} type="password" placeholder="Repeat your password"
              {...register("confirmPassword", { required: "Confirm password", validate: v => v === password || "Passwords do not match" })} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </label>

          <button className="submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>
        </form>

        <div className="signin-prompt">
          <span>Already have an account?</span>
          <a href="/login" className="signin-link">Sign in</a>
        </div>
      </div>
    </div>
  );
}