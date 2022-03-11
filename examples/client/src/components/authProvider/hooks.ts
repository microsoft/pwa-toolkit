import { useContext } from 'react'

import { AuthContext } from './AuthProviderContext'
import { AuthProviderContext } from './types'

export function useAuthProviderContext<T = any>(): AuthProviderContext<T> {
  return useContext(AuthContext)
}
