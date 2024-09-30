import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import './EntryDetails.css';

function EntryDetails() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!entry) {
    return <div>No entry found</div>;
  }

  return (
    <div className="entry-detail-container">
      <h2>Journal Entry</h2>
      <p><strong>Prompt:</strong> {entry.prompt.text}</p>
      <p><strong>Created Date:</strong> {new Date(entry.createdDate.seconds * 1000).toLocaleDateString()}</p>
      <p><strong>Updated Date:</strong> {new Date(entry.updatedDate.seconds * 1000).toLocaleDateString()}</p>
      <p><strong>Content:</strong> {entry.content}</p>
    </div>
  );
}

export default EntryDetails;