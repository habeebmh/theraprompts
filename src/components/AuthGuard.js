import React  from 'react'
import { Navigate, createSearchParams, useLocation } from 'react-router-dom'

import { useAuthState } from '../utils/hooks/useAuthState'
import { useFeatureFlag } from '../utils/hooks/useFeatureFlag'

export const AuthGuard = ({ children, ignoreAuthRedirect }) => {
  const auth = useAuthState()
  const location = useLocation()
  const accountsFlag = useFeatureFlag('accounts');

  if (!accountsFlag) {
    return <Navigate to={{ pathname: '/'}} />;
  }

  return (
    <>
      {!auth.loading && !auth.authenticated && <Navigate to={{ pathname: '/sign-in', search: ignoreAuthRedirect ? undefined : createSearchParams({ redirectUrl: location.pathname }).toString() }} replace />}
      {!auth.loading && auth.authenticated && children}
    </>
  )
}
