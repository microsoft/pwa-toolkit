import { useContext } from 'react'

import { AuthProviderContext } from './AuthProviderContext'
import { AuthProviderConext } from './types'

export function useAuthProviderContext<T = any>(): AuthProviderConext<T> {
  return useContext(AuthProviderContext)
}
