import { createContext } from 'react'

export const AuthContext = createContext({ firebaseUser: null, loading: true })
