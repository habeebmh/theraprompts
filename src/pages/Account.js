import React from 'react';

import { useEntries } from '../utils/hooks/useEntries';
import { useAuthState } from '../utils/hooks/useAuthState';

import './Account.css';

function Account() {
  const { user } = useAuthState();
  const { entries, loading } = useEntries(user?.id);
    
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-container">
      <h2>Your Journal Entries</h2>
      <table className="entries-table">
        <thead>
          <tr>
            <th>Prompt</th>
            <th>Created Date</th>
            <th>Updated Date</th>
          </tr>
        </thead>
        <tbody>
          {(entries ?? []).map(entry => (
            <tr key={entry.id}>
              <td>
                <a href={`/account/entry/${entry.id}`}>{entry.prompt.text}</a>
              </td>
              <td>{new Date(entry.createdDate.seconds * 1000).toLocaleDateString()}</td>
              <td>{new Date(entry.updatedDate.seconds * 1000).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Account;