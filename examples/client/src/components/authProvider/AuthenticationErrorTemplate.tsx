/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, memo } from 'react'

import { useAuthProviderContext } from './hooks'

export const AuthenticationErrorTemplate: FC = memo(
  function AuthenticationErrorTemplate({ children }) {
    const [authContext] = useAuthProviderContext()

    return <>{!authContext.loading && authContext.error != null && children}</>
  },
)
