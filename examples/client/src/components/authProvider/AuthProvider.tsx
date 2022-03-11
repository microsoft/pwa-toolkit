import { FC, memo, PropsWithChildren, useEffect, useState } from 'react'

import { TokenProvider } from '../../types'
import {
  AuthContext,
  authProviderContextDefaultValue,
} from './AuthProviderContext'
import { AuthState } from './types'

export interface AuthProviderProps {
  tokenProvider: TokenProvider
  setIntervalDelay?: number
}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = memo(
  function AuthProvider({
    tokenProvider,
    children,
  }: PropsWithChildren<AuthProviderProps>) {
    const [authState, setAuthState] = useState<AuthState<any>>(
      authProviderContextDefaultValue[0],
    )

    useEffect(() => {
      const loadToken = async (): Promise<void> => {
        try {
          const tokenPayload = await tokenProvider()
          setAuthState({
            loading: false,
            authenticated: tokenPayload != null,
            ...tokenPayload,
          })
        } catch (ex) {
          setAuthState({
            loading: false,
            authenticated: false,
            error: ex as Error,
          })
        }
      }
      void loadToken()
    }, [tokenProvider, setAuthState])

    return (
      <AuthContext.Provider value={[authState, setAuthState]}>
        {children}
      </AuthContext.Provider>
    )
  },
)
