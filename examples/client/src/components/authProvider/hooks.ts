/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext } from 'react'

import { AuthContext } from './AuthProviderContext'
import { AuthProviderContext } from './types'

export function useAuthProviderContext<T = any>(): AuthProviderContext<T> {
  return useContext(AuthContext)
}
