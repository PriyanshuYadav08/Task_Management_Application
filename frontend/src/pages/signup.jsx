import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../api/axios'; // axios instance (baseURL set to your backend)
import '../styles/signup.css'; // import the CSS below (create this file)

export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // backend expects { username, password }
      await api.post('/auth/register', { username: data.username, password: data.password });
      // show success and clear form
      reset();
    } catch (err) {
      // basic error feedback — adapt to your API error shape
      const message = err?.response?.data?.message || 'Registration failed';
      alert(message);
    }
  };

  const password = watch('password', '');

  return (
    <div className="signup-page">
      <div className="signup-card" role="region" aria-labelledby="signup-title">
        <h1 id="signup-title" className="signup-title">Create an account</h1>
        <p className="signup-sub">Sign up to manage your tasks securely.</p>

        <form className="signup-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="field">
            <span className="label">Username</span>
            <input
              className={`input ${errors.username ? 'input-error' : ''}`}
              type="text"
              placeholder="Choose a username"
              {...register('username', {
                required: 'Username is required',
                minLength: { value: 3, message: 'At least 3 characters' },
                maxLength: { value: 30, message: 'At most 30 characters' },
                pattern: { value: /^[a-zA-Z0-9_.-]+$/, message: 'Letters, numbers, - _ . only' },
              })}
              aria-invalid={errors.username ? 'true' : 'false'}
            />
            {errors.username && <span className="error">{errors.username.message}</span>}
          </label>

          <label className="field">
            <span className="label">Email (optional)</span>
            <input
              className="input"
              type="email"
              placeholder="you@example.com"
              {...register('email', {
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
              })}
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </label>

          <label className="field">
            <span className="label">Password</span>
            <input
              className={`input ${errors.password ? 'input-error' : ''}`}
              type="password"
              placeholder="Create a strong password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'At least 8 characters' },
                validate: (v) =>
                  /[A-Z]/.test(v) || 'Include at least one uppercase letter' ||
                  /[0-9]/.test(v) || 'Include at least one number',
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </label>

          <label className="field">
            <span className="label">Confirm password</span>
            <input
              className={`input ${errors.confirmPassword ? 'input-error' : ''}`}
              type="password"
              placeholder="Repeat your password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (v) => v === password || 'Passwords do not match',
              })}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
          </label>

          <button className="submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Account'}
          </button>

          <div className="muted">
            By creating an account you agree to our <a href="#" onClick={(e)=>e.preventDefault()}>Terms</a>.
          </div>

          {isSubmitSuccessful && <div className="success">Account created successfully — please log in.</div>}
        </form>

        <div className="signin-prompt">
          <span>Already have an account?</span>
          <a href="/login" className="signin-link">Sign in</a>
        </div>
      </div>

      <div className="signup-illustration" aria-hidden="true">
        {/* decorative illustration area, stays empty or you can place an SVG */}
      </div>
    </div>
  );
}