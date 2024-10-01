import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useAuthState } from '../utils/hooks/useAuthState';
import { createEntry } from '../utils/hooks/useCreateEntry';
import { encode } from '../utils/encode';

import './CreateEntry.css';

function CreateEntry() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { uid } = useAuthState();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const topic = useMemo(() => searchParams.get('topic'), [searchParams]);
  const prompt = useMemo(() => searchParams.get('prompt'), [searchParams]);
  const index = useMemo(() => searchParams.get('index'), [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (uid) {
        await createEntry(uid, prompt, index, topic, encode(content));
        setSuccess('Journal entry created successfully!');
        setContent('');
        navigate('/account');
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
        <div className="create-entry-form-group">
          <label>Prompt</label>
          <p><b>{topic} #{index}</b> {prompt}</p>
        </div>
        <div className="create-entry-form-group">
          <label>Entry:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <span className='caption'>This entry will be encrypted before it leaves your computer.</span>
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="create-entry-form-group">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default CreateEntry;