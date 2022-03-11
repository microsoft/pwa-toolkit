/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, memo } from 'react'

import { useAuthProviderContext } from './hooks'

export const AuthenticationLoadingTemplate: FC = memo(
  function AuthenticationLoadingTemplate({ children }) {
    const [authContext] = useAuthProviderContext()

    return <>{authContext.loading && children}</>
  },
)
