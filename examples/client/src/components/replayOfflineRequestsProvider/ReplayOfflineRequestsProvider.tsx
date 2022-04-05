/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import type { ReplayOfflineRequests } from '@pwa-toolkit/core'
import { FC, memo, PropsWithChildren, useEffect, useState } from 'react'

import {
  ReplayOfflineRequestsContext,
  replayOfflineRequestsDefaultContext,
} from './context'

export interface ReplayOfflineRequestsProviderProps {
  replayer?: ReplayOfflineRequests
}

export const ReplayOfflineRequestsProvider: FC<
  PropsWithChildren<ReplayOfflineRequestsProviderProps>
> = memo(function ReplayOfflineRequestsProvider({
  replayer,
  children,
}: PropsWithChildren<ReplayOfflineRequestsProviderProps>) {
  const [requestReplayer, setRequestReplayer] = useState<ReplayOfflineRequests>(
    replayOfflineRequestsDefaultContext,
  )

  useEffect(() => {
    if (replayer !== undefined) {
      setRequestReplayer(replayer)
    }
  }, [replayer, setRequestReplayer])

  return (
    <ReplayOfflineRequestsContext.Provider value={requestReplayer}>
      {children}
    </ReplayOfflineRequestsContext.Provider>
  )
})
