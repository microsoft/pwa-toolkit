/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, memo } from 'react'

import { useAuthProviderContext } from './hooks'

export const AuthenticatedTemplate: FC = memo(function AuthenticatedTemplate({
  children,
}) {
  const [authContext] = useAuthProviderContext()

  return <>{authContext.authenticated && children}</>
})
