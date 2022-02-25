import { Theme, useTheme } from '@fluentui/react'
import { gql } from 'graphql-request'
import { FC, memo, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Flex from '../../../components/flexbox/flexbox'
import { useRequest } from '../../../hooks/useRequet'

const Container = styled.div`
  height: 100%;
  padding-top: ${({ theme }: { theme: Theme }) => theme.spacing.l2};
  background: ${({ theme }: { theme: Theme }) => theme.palette.neutralLighter};
  box-shadow: ${({ theme }: { theme: Theme }) => theme.effects.elevation8};
  border-right: 1px solid
    ${({ theme }: { theme: Theme }) => theme.palette.neutralLighter};
`

const StyledLink = styled(Link)`
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.s1};
  padding-left: ${({ theme }: { theme: Theme }) => theme.spacing.m};
  color: ${({ theme }: { theme: Theme }) => theme.palette.accent};
  font-weight: bold;
  text-decoration: none;
  &:hover {
    background: ${({ theme }: { theme: Theme }) =>
      theme.palette.themeLighterAlt};
  }
`

const notesQuery = gql`
  query Notes {
    notes {
      id
      title
    }
  }
`

const NotesPanel: FC = function NotesPanel() {
  const theme = useTheme()
  const location = useLocation()
  const navigate = useNavigate()
  const [gqlQuery] = useState(notesQuery)
  const [notes, setNotes] = useState<API.Note[]>([])
  const [res] = useRequest<{ notes: API.Note[] }>(gqlQuery)

  const Links = useMemo(() => {
    return notes.map((note) => {
      return (
        <StyledLink theme={theme} to={note.id} key={note.id}>
          {note.title}
        </StyledLink>
      )
    })
  }, [notes, theme])

  useEffect(() => {
    if (res !== null) {
      setNotes(res.notes)
    }
  }, [res])

  useEffect(() => {
    if (notes.length > 0 && location.pathname === '/') {
      navigate(notes[0].id)
    }
  }, [notes, notes.length, location, navigate])

  if (res === null) {
    return <Container theme={theme}>Loading...</Container>
  }

  return (
    <Container theme={theme}>
      <Flex vertical gap="5px">
        {Links}
      </Flex>
    </Container>
  )
}

export default memo(NotesPanel)
