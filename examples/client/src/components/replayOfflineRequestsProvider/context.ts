/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ReplayOfflineRequests } from '@pwa-toolkit/core'
import { createContext } from 'react'

import { ReplayOfflineRequestsContextType } from './types'

export const replayOfflineRequestsDefaultContext: ReplayOfflineRequestsContextType =
  new ReplayOfflineRequests()

export const ReplayOfflineRequestsContext =
  createContext<ReplayOfflineRequestsContextType>(
    replayOfflineRequestsDefaultContext,
  )
ReplayOfflineRequestsContext.displayName = 'ReplayOfflineRequestsContext'
