import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button'

import './SignIn.css';

function SignIn() {
  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate(); 
    
  const [error, setError] = useState('');

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider).then(() => {
        navigate('/account');
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="center-container">
      <div className="sign-in-container">
        <h2>Sign in to Theraprompts</h2>
        <p>
          Welcome to Theraprompts! Sign in with Google to save your responses and access them later.
        </p>
        <GoogleButton onClick={handleSignInWithGoogle} className="google-sign-in-button">
          Sign In with Google
        </GoogleButton>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default SignIn;
