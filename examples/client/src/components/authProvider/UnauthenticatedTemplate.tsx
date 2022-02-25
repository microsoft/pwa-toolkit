import { FC, memo } from 'react'

import { useAuthProviderContext } from './hooks'

export const UnauthenticatedTemplate: FC = memo(
  function UnauthenticatedTemplate({ children }) {
    const [authContext] = useAuthProviderContext()

    return <>{!authContext.authenticated && children}</>
  },
)
