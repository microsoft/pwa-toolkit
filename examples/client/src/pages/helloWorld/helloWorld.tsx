import { DocumentCard, Theme, useTheme } from '@fluentui/react'
import { FC, memo, useEffect, useState } from 'react'
import styled from 'styled-components'

import { config } from '../../config'

const Container = styled(DocumentCard)<{ theme: Theme }>`
  max-width: 400px;
  margin: ${({ theme }: { theme: Theme }) => theme.spacing.l2} auto;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.m};
  box-shadow: ${({ theme }: { theme: Theme }) => theme.effects.elevation64};
`

enum ComponentState {
  Waiting = 'Waiting',
  Loading = 'Loading',
}

const HelloWorldPage: FC = function HelloWorldPage() {
  const theme = useTheme()
  const [componentState, setComponentState] = useState<ComponentState>(
    ComponentState.Loading,
  )
  const [helloWorldResponse, setHelloWorldResponse] = useState('')

  useEffect(() => {
    const fetchHelloWorld = async (): Promise<void> => {
      const request = await fetch(`${config.restApi}/hello`)
      const helloResponse = await request.json()
      setHelloWorldResponse(JSON.stringify(helloResponse, undefined, 2))
      setComponentState(ComponentState.Waiting)
    }
    void fetchHelloWorld()
  }, [setComponentState, setHelloWorldResponse])

  return (
    <Container theme={theme}>
      <h1>Hello</h1>
      {componentState === ComponentState.Loading && <>Loading...</>}
      {helloWorldResponse}
    </Container>
  )
}

export default memo(HelloWorldPage)
