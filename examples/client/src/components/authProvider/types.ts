import { TokenPayload } from '../../types'

export type SetAuthContext<T = {}> = (authContext: AuthContext<T>) => void
export interface AuthContext<T = {}> extends Partial<TokenPayload<T>> {
  loading: boolean
  authenticated: boolean
  error?: Error
}

export type AuthProviderConext<T = {}> = [AuthContext<T>, SetAuthContext<T>]
