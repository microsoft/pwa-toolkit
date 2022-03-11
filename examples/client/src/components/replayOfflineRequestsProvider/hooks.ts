/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useContext } from 'react'

import { ReplayOfflineRequestsContext } from './context'
import { ReplayOfflineRequestsContextType } from './types'

export function useReplayOfflineRequestsContext(): ReplayOfflineRequestsContextType {
  return useContext(ReplayOfflineRequestsContext)
}
