import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { getAnalytics, setUserProperties } from 'firebase/analytics'

import { AuthContext } from '../contexts/AuthContext'

const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  const analytics = getAnalytics()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUserProperties(analytics, {
        user_id: firebaseUser?.uid,
        user_email: firebaseUser?.email
      })
      setFirebaseUser(firebaseUser)
      setLoading(false)
    })

    return unsubscribe
  }, [auth, analytics])

  return (
    <AuthContext.Provider value={{ firebaseUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
