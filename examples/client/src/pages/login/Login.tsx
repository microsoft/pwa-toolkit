/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
  DocumentCard,
  Label,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  TextField,
  Theme,
  useTheme,
} from '@fluentui/react'
import React, { FC, memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAuthProviderContext } from '../../components/authProvider'
import { config } from '../../config'
import { tokenProvider } from '../../lib/auth'

const Container = styled(DocumentCard)<{ theme: Theme }>`
  max-width: 400px;
  margin: ${({ theme }: { theme: Theme }) => theme.spacing.l2} auto;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.m};
  box-shadow: ${({ theme }: { theme: Theme }) => theme.effects.elevation64};
`

const StyledButton = styled(PrimaryButton)`
  width: 100%;
`

enum ComponentState {
  Waiting = 'Waiting',
  Authenticating = 'Authenticating',
  Authenticated = 'Authenticated',
  Error = 'Error',
}

const LoginPage: FC = function LoginPage() {
  const theme = useTheme()
  const [, setAuthProviderContext] = useAuthProviderContext()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setEerrorMessage] = useState<string>('')
  const [componentState, setComponentState] = useState<ComponentState>(
    ComponentState.Waiting,
  )

  const login = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setEerrorMessage('')
      setComponentState(ComponentState.Authenticating)
      const loginResponse = await fetch(`${config.restApi}/authenticate`, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      if (!loginResponse.ok) {
        if (loginResponse.status === 401) {
          setEerrorMessage('Incorrect email or password.')
        } else {
          setEerrorMessage(loginResponse.statusText)
        }
        setComponentState(ComponentState.Error)
      } else {
        const tokenPayload = await tokenProvider()
        setAuthProviderContext({
          loading: false,
          authenticated: true,
          ...tokenPayload,
        })
        navigate('/')
      }
    },
    [email, password, setComponentState, navigate, setAuthProviderContext],
  )

  const closeErrorMessage = useCallback(() => {
    setComponentState(ComponentState.Waiting)
    setEerrorMessage('')
  }, [setComponentState, setEerrorMessage])

  const updateEmail = useCallback(
    (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string,
    ) => {
      setEmail(newValue ?? '')
    },
    [setEmail],
  )

  const updatePassword = useCallback(
    (
      e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
      newValue?: string,
    ) => {
      setPassword(newValue ?? '')
    },
    [setPassword],
  )

  return (
    <Container theme={theme}>
      {componentState === ComponentState.Error && errorMessage !== '' && (
        <MessageBar
          messageBarType={MessageBarType.error}
          dismissButtonAriaLabel="close"
          onDismiss={closeErrorMessage}
        >
          {errorMessage}
        </MessageBar>
      )}

      <form onSubmit={login}>
        <Label htmlFor="email">Email: </Label>
        <TextField id="email" value={email} onChange={updateEmail} />
        <Label htmlFor="password">Password: </Label>
        <TextField
          id="password"
          type="password"
          value={password}
          onChange={updatePassword}
          canRevealPassword
          revealPasswordAriaLabel="Show Password"
        />
        <br />
        <StyledButton
          disabled={componentState === ComponentState.Authenticating}
          type="submit"
        >
          {componentState === ComponentState.Authenticating
            ? 'Authenticating...'
            : 'Login'}
        </StyledButton>
      </form>
    </Container>
  )
}

export default memo(LoginPage)
