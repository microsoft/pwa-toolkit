import { FC, memo } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

import Flex from '../../components/flexbox/flexbox'
import NotesPanel from './components/notesPanel'

const NotesPage: FC = function NotesPage() {
  return (
    <Container>
      <Flex.Box shrink={0} basis="200px">
        <NotesPanel />
      </Flex.Box>
      <Flex.Box shrink={1} basis="600px">
        <Outlet />
      </Flex.Box>
    </Container>
  )
}

const Container = styled(Flex)`
  height: 100%;
`

export default memo(NotesPage)
