import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { getAnalytics, setUserProperties } from 'firebase/analytics'
import { doc, getDoc, getFirestore } from 'firebase/firestore'

import { AuthContext } from '../contexts/AuthContext'


export async function getUser (firebaseUid) {
  if (!firebaseUid) {
    return undefined
  }
  const firestore = getFirestore()
  const userDoc = await getDoc(doc(firestore, 'users', firebaseUid))
  const user = { ...userDoc.data(), id: firebaseUid }
  return user
}

const AuthProvider = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [user, setUser] = useState(undefined)
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
      getUser(firebaseUser?.uid).then((user) => {
        setUser(user)
        setLoading(false)
      }).catch(() => {
        setUser(undefined)
        setLoading(false)
      })
    })

    return unsubscribe
  }, [auth, analytics])

  return (
    <AuthContext.Provider value={{ firebaseUser, user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
