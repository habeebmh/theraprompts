import React, { useState, useEffect } from 'react';

import { useAuthState } from '../utils/hooks/useAuthState';

import './CreateEntry.css';

function CreateEntry() {
  const [prompt, setPrompt] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { user } = useAuthState();

  useEffect(() => {
    // Fetch a random prompt or set a default prompt
    const fetchPrompt = async () => {
      // Replace this with your logic to fetch a prompt
      const randomPrompt = "What are you grateful for today?";
      setPrompt(randomPrompt);
    };

    fetchPrompt();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (user) {
        setSuccess('Journal entry created successfully!');
        setContent('');
      } else {
        setError('You must be signed in to create a journal entry.');
      }
    } catch (err) {
      setError('Error creating journal entry: ' + err.message);
    }
  };

  return (
    <div className="create-entry-container">
      <h2>Create a Journal Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Prompt:</label>
          <p>{prompt}</p>
        </div>
        <div className="form-group">
          <label>Entry:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default CreateEntry;