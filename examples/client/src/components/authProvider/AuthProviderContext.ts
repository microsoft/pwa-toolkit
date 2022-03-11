import { createContext } from 'react'

import { AuthProviderContext } from './types'

export const authProviderContextDefaultValue: AuthProviderContext<any> = [
  {
    loading: true,
    authenticated: false,
  },
  () => {},
]

export const AuthContext = createContext<AuthProviderContext<any>>(
  authProviderContextDefaultValue,
)
