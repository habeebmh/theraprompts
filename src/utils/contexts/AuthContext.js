import { createContext } from 'react'

export const AuthContext = createContext({ firebaseUser: null, user: undefined, loading: true })
