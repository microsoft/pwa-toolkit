/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { TokenPayload } from '../../types'

export type SetAuthState<T = {}> = (authContext: AuthState<T>) => void
export interface AuthState<T = {}> extends Partial<TokenPayload<T>> {
  loading: boolean
  authenticated: boolean
  error?: Error
}

export type AuthProviderContext<T = {}> = [AuthState<T>, SetAuthState<T>]
