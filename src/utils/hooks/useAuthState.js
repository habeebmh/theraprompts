import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'

export const useAuthState = () => {
  const { firebaseUser, user, loading } = useContext(AuthContext)

  if (firebaseUser != null) {
    return {
      authenticated: firebaseUser !== null,
      user,
      firebaseUser,
      loading
    }
  } else {
    return { authenticated: false, user: undefined, firebaseUser: null, loading }
  }
}
