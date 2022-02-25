import { FC, memo, PropsWithChildren, useEffect, useState } from 'react'

import { TokenProvider } from '../../types'
import {
  AuthProviderContext,
  authProviderContextDefaultValue,
} from './AuthProviderContext'
import { AuthContext } from './types'

export interface AuthProviderProps {
  tokenProvider: TokenProvider
  setIntervalDelay?: number
}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = memo(
  function AuthProvider({
    tokenProvider,
    children,
  }: PropsWithChildren<AuthProviderProps>) {
    const [authContext, setAuthProviderContext] = useState<AuthContext<any>>(
      authProviderContextDefaultValue[0],
    )

    useEffect(() => {
      const loadToken = async (): Promise<void> => {
        try {
          const tokenPayload = await tokenProvider()
          setAuthProviderContext({
            loading: false,
            authenticated: tokenPayload != null,
            ...tokenPayload,
          })
        } catch (ex) {
          setAuthProviderContext({
            loading: false,
            authenticated: false,
            error: ex as Error,
          })
        }
      }
      void loadToken()
    }, [tokenProvider, setAuthProviderContext])

    return (
      <AuthProviderContext.Provider
        value={[authContext, setAuthProviderContext]}
      >
        {children}
      </AuthProviderContext.Provider>
    )
  },
)
