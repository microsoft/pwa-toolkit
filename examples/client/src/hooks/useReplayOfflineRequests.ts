/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ReplayOfflineRequests } from '@pwa-toolkit/core'
import { useCallback, useState } from 'react'

export type UseReplayOfflineRequestsOptions = {
  indexedDBName?: string
  indexedDBTable?: string
}

export function useReplayOfflineRequests(
  options: UseReplayOfflineRequestsOptions = {},
): () => AsyncGenerator<Response, void, void> {
  const [replayer] = useState(
    new ReplayOfflineRequests({
      indexedDBName: options.indexedDBName ?? 'PWA-Toolkit',
      indexedDBTable: options.indexedDBTable ?? 'Offline requests',
    }),
  )

  const replay = useCallback(() => {}, [replayer])

  return replay
}
