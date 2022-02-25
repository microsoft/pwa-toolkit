import {
  Label,
  PrimaryButton,
  TextField,
  Theme,
  useTheme,
} from '@fluentui/react'
import { gql } from 'graphql-request'
import type { GraphQLResponse } from 'graphql-request/dist/types'
import { FC, memo, useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import Flex from '../../components/flexbox/flexbox'
import { gqlClient } from '../../lib/gqlClient'

const Container = styled.div`
  max-width: 600px;
  margin: ${({ theme }: { theme: Theme }) => theme.spacing.l2} auto;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.m};
  box-shadow: ${({ theme }: { theme: Theme }) => theme.effects.elevation64};
`

const StyledButton = styled(PrimaryButton)`
  width: 100%;
`

const createNoteMutation = gql`
  mutation CreateNote($title: String!, $content: String) {
    createNote(title: $title, content: $content) {
      id
      title
      content
    }
  }
`

enum ComponentState {
  Waiting = 'Waiting',
  Saving = 'Saving',
  Error = 'Error',
}

const CreateNotePage: FC = function CreateNotePage() {
  const theme = useTheme()
  const [componentState, setComponentState] = useState<ComponentState>(
    ComponentState.Waiting,
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (componentState === ComponentState.Error) {
      alert(errorMessage)
      setComponentState(ComponentState.Waiting)
      setErrorMessage('')
    }
  }, [componentState, setComponentState, errorMessage, setErrorMessage])

  const handleTitleUpdate = useCallback(
    (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string,
    ) => {
      e.preventDefault()
      setTitle(newValue ?? '')
    },
    [setTitle],
  )

  const handleContentUpdate = useCallback(
    (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string,
    ) => {
      e.preventDefault()
      setContent(newValue ?? '')
    },
    [setContent],
  )

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setComponentState(ComponentState.Saving)
      try {
        const results = await gqlClient.request<{ createNote: API.Note }>(
          createNoteMutation,
          {
            title,
            content,
          },
        )
        navigate(`/${results.createNote.id}`)
        setComponentState(ComponentState.Waiting)
      } catch (ex: any) {
        const errorMessage =
          (ex.response as GraphQLResponse).errors?.reduce((acc, cur) => {
            return `${acc}${acc !== '' ? '\n' : ''}${cur.message}`
          }, '') ?? ''
        setErrorMessage(errorMessage)
        setComponentState(ComponentState.Error)
      }
    },
    [setComponentState, content, title, navigate],
  )

  return (
    <Container theme={theme}>
      <form style={{ height: '100%' }} onSubmit={handleSubmit}>
        <Flex gap="5px" vertical>
          <Label htmlFor="title">Title: </Label>
          <TextField id="title" value={title} onChange={handleTitleUpdate} />
          <Label htmlFor="note">Note: </Label>
          <TextField
            id="note"
            multiline
            rows={15}
            value={content}
            onChange={handleContentUpdate}
          />
          <StyledButton
            type="submit"
            disabled={componentState === ComponentState.Saving}
          >
            {componentState === ComponentState.Saving ? 'Saving...' : 'Save'}
          </StyledButton>
        </Flex>
      </form>
    </Container>
  )
}

export default memo(CreateNotePage)
