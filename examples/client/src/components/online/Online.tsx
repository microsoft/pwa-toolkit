/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme, useTheme } from '@fluentui/react'
import { FC, memo, useEffect, useState } from 'react'
import styled from 'styled-components'

import { useReplayOfflineRequests } from '../../hooks/useReplayOfflineRequests'
import { useNetworkCheckContext } from '../networkCheckProvider'

const Container = styled.div<{ theme: Theme }>`
  color: ${({ theme }: { theme: Theme }) => theme.palette.neutralLight};
`

enum ComponentState {
  Online = 'Online',
  Offline = 'Offline',
  Syncing = 'Syncing',
  Error = 'Error',
}
export const Online: FC = memo(function Online() {
  const theme = useTheme()
  const { networkState, isNetworkOnline } = useNetworkCheckContext()
  const [componentState, setComponentState] = useState<ComponentState>(
    ComponentState.Online,
  )
  const replay = useReplayOfflineRequests()

  useEffect(() => {
    async function sync(): Promise<void> {
      if (networkState.online) {
        setComponentState(ComponentState.Syncing)
        try {
          for await (const response of replay()) {
            if (response.status !== 200) {
              setComponentState(ComponentState.Error)
              break
            }
          }
          setComponentState(ComponentState.Online)
        } catch (ex) {
          setComponentState(ComponentState.Error)
        }
      } else {
        setComponentState(ComponentState.Offline)
      }
    }
    void sync()
  }, [networkState, setComponentState, replay, isNetworkOnline])
  return <Container theme={theme}>{componentState}</Container>
})
