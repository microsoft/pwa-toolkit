/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useCallback } from 'react'

import { useReplayOfflineRequestsContext } from '../components/replayOfflineRequestsProvider'

export function useReplayOfflineRequests(): () => AsyncGenerator<
  Response,
  void,
  void
> {
  const replayer = useReplayOfflineRequestsContext()

  const replay = useCallback(() => {
    return replayer.replayRequests()
  }, [replayer])

  return replay
}
