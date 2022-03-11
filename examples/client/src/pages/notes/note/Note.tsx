/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import './notes.css'

import { PrimaryButton, TextField, Theme, useTheme } from '@fluentui/react'
import { gql } from 'graphql-request'
import type { GraphQLResponse } from 'graphql-request/dist/types'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import Flex from '../../../components/flexbox/flexbox'
import { useRequest } from '../../../hooks/useRequest'
import { gqlClient } from '../../../lib/gqlClient'

const Container = styled.div`
  height: 100%;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.l2};
  padding-top: 0;
`

const StyledTextArea = styled(TextField)`
  height: 100%;
`

const StyledButton = styled(PrimaryButton)`
  width: 100%;
`

const noteQuery = gql`
  query Note($id: String!) {
    note(id: $id) {
      id
      title
      content
    }
  }
`

const noteMutation = gql`
  mutation EditNote($id: String!, $content: String) {
    editNote(id: $id, content: $content) {
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

const NotePage: FC = function NotePage() {
  const theme = useTheme()
  const [componentState, setComponentState] = useState<ComponentState>(
    ComponentState.Waiting,
  )
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const { noteId } = useParams()
  const [gqlQuery] = useState(noteQuery)
  const queryVariables = useMemo(() => {
    return {
      id: noteId,
    }
  }, [noteId])
  const [res, requestNoteErrors] = useRequest<{ note?: API.Note }>(
    gqlQuery,
    queryVariables,
  )

  useEffect(() => {
    if (res !== null) {
      if (res.note != null) {
        setTitle(res.note.title ?? '')
        setContent(res.note.content ?? '')
      } else {
        setErrorMessage(`404. Cannot locate note ${noteId ?? ''}`)
        setComponentState(ComponentState.Error)
      }
    }
    if (requestNoteErrors.length > 0) {
      const errorMessage = requestNoteErrors.reduce((acc, cur) => {
        return `${acc}${acc !== '' ? '\n' : ''}${cur.message}`
      }, '')
      setErrorMessage(errorMessage)
      setComponentState(ComponentState.Error)
    }
  }, [
    res,
    setTitle,
    setContent,
    requestNoteErrors,
    setErrorMessage,
    setComponentState,
    noteId,
  ])

  useEffect(() => {
    if (componentState === ComponentState.Error) {
      alert(errorMessage)
      setComponentState(ComponentState.Waiting)
      setErrorMessage('')
    }
  }, [componentState, setComponentState, errorMessage, setErrorMessage])

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
        await gqlClient.request<{ editNote: API.Note }>(noteMutation, {
          id: noteId,
          content: content,
        })
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
    [setComponentState, noteId, content],
  )

  return (
    <Container theme={theme}>
      <form style={{ height: '100%' }} onSubmit={handleSubmit}>
        <Flex style={{ height: '100%' }} vertical gap="10px">
          <h1>{title}</h1>
          <Flex.Box grow={1}>
            <StyledTextArea
              multiline
              value={content}
              onChange={handleContentUpdate}
            />
          </Flex.Box>
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

export default memo(NotePage)
