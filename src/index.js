import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const firebaseConfig = {
  apiKey: "AIzaSyBw_nDvtoAc8EECR9LWiJUPHMoEetrQyMg",
  authDomain: "positive-prompts.firebaseapp.com",
  projectId: "positive-prompts",
  storageBucket: "positive-prompts.appspot.com",
  messagingSenderId: "942760493829",
  appId: "1:942760493829:web:138862621bcf6e76d26d6c"
};
initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
