import React from 'react'

import { useEntries } from '../utils/hooks/useEntries'
import { useAuthState } from '../utils/hooks/useAuthState'

import './Account.css'

function Account () {
  const { uid } = useAuthState()
  const { entries, loading } = useEntries(uid)

  return (
    <div className='account-center-container'>
      <div className="account-container">
        <h2>Your Journal Entries</h2>
        <table className="entries-table">
          <thead>
            <tr>
              <th>Prompt</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {(entries ?? []).sort((a, b) => b.updatedTimestamp - a.updatedTimestamp).map((entry, index) => (
              <tr key={entry.id}>
                <td>
                  <a href={`/account/entry/${entry.id}`}><b>{entry.topic} #{entry.index}</b></a>
                </td>
                <td>{new Date(entry.createdTimestamp).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p>Loading...</p>}
      </div>
      {entries.length === 0 && !loading && <div className='no-entries-container'>
        <h2 className='subtitle'>No journal entries yet, <a href='/'>start here to create a new one.</a></h2>
      </div>}
    </div>
  )
}

export default Account
