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

  const replay = useCallback(() => {
    return replayer.replayRequests()
  }, [replayer])

  return replay
}
