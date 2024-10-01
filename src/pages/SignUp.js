import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signUpUser } from '../utils/auth';

import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords don't match");
      }
      await signUpUser(username.trim(), password, firstName.trim());
      navigate('/account');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign-up-center-container">
      <div className="sign-up-container">
        <h2>Sign Up</h2>
        <p>Sign up to save your responses and access them later.</p>
        <form onSubmit={handleSignUp} className='sign-up-form'>
          <div className="sign-up-form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="sign-up-form-group">
            <label htmlFor="username">Email:</label>
            <input
              type="email"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="sign-up-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          <div className="sign-up-form-group">
            <label htmlFor="password">Confirm password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="sign-up-form-group">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;