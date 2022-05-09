/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	PartialTheme,
	MessageBar,
	MessageBarType,
	IconButton,
} from '@fluentui/react'
import React, { memo } from 'react'
import styled from 'styled-components'

export interface CustomModalMessageProps {
  show: boolean
  type: MessageBarType
  message: string
  errorMessage: string,
  resetChoice?: () => void
}

export const CustomModalMessage: React.FC<CustomModalMessageProps> = memo(
	function CustomModalMessage({
    show,
    type,
    message,
    errorMessage,
    resetChoice
  }) {

		return (
			<Container>
        {
          show ? 
          <CustomMessageBar
            onDismiss={resetChoice}
            dismissButtonAriaLabel="Close"
            messageBarType={type}>
            <MainMessage>{message}</MainMessage>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </CustomMessageBar>
        : null
        }
			</Container>
		)
	},
)

const Container = styled.div`
	margin-left: ${({ theme }: { theme: PartialTheme }) => theme.spacing?.l2};
`

const CustomMessageBar = styled(MessageBar)`
	width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`

const MainMessage = styled.div`
  font-weight: bold;
`

const ErrorMessage = styled.div`
`