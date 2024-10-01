import React, { useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { signIn } from '../utils/auth';

import './SignIn.css';

function SignIn() {    
  const [error, setError] = useState('');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams({ successReset: 'false', redirectUrl: '' })
  const [loading, setLoading] = useState(false)

  const handleRedirectAfterLogin = useCallback(async () => {
    const redirectUrl = searchParams.get('redirectUrl')
    if (redirectUrl) {
      navigate(redirectUrl, { replace: true })
    } else {
      navigate('/account', { replace: true })
    }
  }, [navigate, searchParams])

  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password)
      console.log('user', user)
      await handleRedirectAfterLogin()
    } catch (err) {
      setError(err.message);
      setLoading(false)
    }
  };

  return (
    <div className="sign-in-center-container">
      <div className="sign-in-container">
        <h2>Sign in to Theraprompts</h2>
        <p>
          Welcome to Theraprompts! Sign in to save your responses and access them later.
        </p>
        <form className='sign-in-form'>
          <div className="sign-in-form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              autoCapitalize='none'
              autoComplete='username'
            />
          </div>
          <div className="sign-in-form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              autoComplete='current-password'
            />
          </div>
          {error && <p className="error">{error}</p>}
          <div className="sign-in-form-group">
            <button type="button" onClick={handleSignIn} disabled={loading}>Sign In</button>
            <hr />
          </div>
        </form>
        <a href='/sign-up' className='sign-up-link'>Don't have an account? Sign up here</a>
      </div>
    </div>
  );
}

export default SignIn;
