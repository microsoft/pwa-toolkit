import { FC, memo } from 'react'

import { useAuthProviderContext } from './hooks'

export const AuthenticatedTemplate: FC = memo(function AuthenticatedTemplate({
  children,
}) {
  const [authContext] = useAuthProviderContext()

  return <>{authContext.authenticated && children}</>
})
