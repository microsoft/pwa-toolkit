import { createContext } from 'react'

import { AuthProviderConext } from './types'

export const authProviderContextDefaultValue: AuthProviderConext<any> = [
  {
    loading: true,
    authenticated: false,
  },
  () => {},
]

export const AuthProviderContext = createContext<AuthProviderConext<any>>(
  authProviderContextDefaultValue,
)
