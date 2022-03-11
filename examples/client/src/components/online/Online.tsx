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
            console.log(response)
            await delay(5000)
            if (!(await isNetworkOnline())) {
              break
            }
          }
          setComponentState(ComponentState.Online)
        } catch (ex) {
          console.log(ex)
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

async function delay(ms: number): Promise<void> {
  return await new Promise((resolve, reject) => {
    setTimeout(resolve, ms)
  })
}
