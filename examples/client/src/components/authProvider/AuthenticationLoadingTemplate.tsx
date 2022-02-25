import { FC, memo } from 'react'

import { useAuthProviderContext } from './hooks'

export const AuthenticationLoadingTemplate: FC = memo(
  function AuthenticationLoadingTemplate({ children }) {
    const [authContext] = useAuthProviderContext()

    return <>{authContext.loading && children}</>
  },
)
