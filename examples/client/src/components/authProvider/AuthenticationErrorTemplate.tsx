import { FC, memo } from 'react'

import { useAuthProviderContext } from './hooks'

export const AuthenticationErrorTemplate: FC = memo(
  function AuthenticationErrorTemplate({ children }) {
    const [authContext] = useAuthProviderContext()

    return <>{!authContext.loading && authContext.error != null && children}</>
  },
)
