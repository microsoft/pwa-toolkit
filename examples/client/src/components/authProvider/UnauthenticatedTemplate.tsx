/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, memo } from 'react'

import { useAuthProviderContext } from './hooks'

export const UnauthenticatedTemplate: FC = memo(
  function UnauthenticatedTemplate({ children }) {
    const [authContext] = useAuthProviderContext()

    return <>{!authContext.authenticated && children}</>
  },
)
