import { useContext, useMemo } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const useAuthState = () => {
  const { firebaseUser, loading } = useContext(AuthContext)

  const authState = useMemo(() => {
    if (firebaseUser != null) {
      return {
        authenticated: firebaseUser !== null,
        uid: firebaseUser?.uid,
        loading
      }
    } else {
      return { authenticated: false, user: undefined, firebaseUser: null, loading }
    }
  }, [firebaseUser, loading])

  return authState
}
