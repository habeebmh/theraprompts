import React from 'react'
import { useParams } from 'react-router-dom'

import { useAuthState } from '../utils/hooks/useAuthState'
import { useEntry } from '../utils/hooks/useEntry'
import { decode } from '../utils/encode'

import './EntryDetails.css'

function EntryDetails () {
  const { uid } = useAuthState()
  const { id } = useParams()
  const { entry, loading } = useEntry(uid, id)

  if (!entry) {
    return
  }

  return (
    <div className="entry-detail-container">
      <h2>Journal Entry</h2>
      {!entry && !loading && <div>No entry found</div>}
      <p><strong>{entry.topic} #{entry.index}</strong> {entry.promptText}</p>
      <p><strong>Created</strong> {new Date(entry.createdTimestamp).toLocaleDateString()}</p>
      <p><strong>Last Updated</strong> {new Date(entry.updatedTimestamp).toLocaleDateString()}</p>
      <p><strong>Entry</strong></p>
      <p>{decode(entry.content)}</p>
    </div>
  )
}

export default EntryDetails
