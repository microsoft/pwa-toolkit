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
import { ComponentState } from '../online'

export interface NetworkStatusBarProps {
	componentState: ComponentState
}

export const NetworkStatusBar: React.FC<NetworkStatusBarProps> = memo(
	function NetworkStatusBar({
    componentState
  }) {

		return (
			<Container>
					{componentState === ComponentState.Online ? (
						<CustomMessageBar
							messageBarType={MessageBarType.success}
							isMultiline={false}>
							<IconButton iconProps={{ iconName: 'WifiEthernet' }} title="WifiEthernet" ariaLabel="WifiEthernet" />
							Application is {componentState.toLowerCase()}
						</CustomMessageBar>
					) : null}

          {componentState === ComponentState.Offline ? (
						<CustomMessageBar
              messageBarType={MessageBarType.warning}
              isMultiline={false}>
              <IconButton iconProps={{ iconName: 'WifiWarning4' }} title="WifiWarning4" ariaLabel="WifiWarning4" />
              Application is {componentState.toLowerCase()}
            </CustomMessageBar>
          ) : null}

          {componentState === ComponentState.Error ? (
            <CustomMessageBar
              messageBarType={MessageBarType.error}
              isMultiline={false}>
              <IconButton iconProps={{ iconName: 'ErrorBadge' }} title="ErrorBadge" ariaLabel="ErrorBadge" />
              Application is in {componentState.toLowerCase()} state
            </CustomMessageBar>
          ) : null}

          {componentState === ComponentState.Syncing ? (
            <CustomMessageBar
              messageBarType={MessageBarType.warning}
              isMultiline={false}>
              <IconButton iconProps={{ iconName: 'Sync' }} title="Sync" ariaLabel="Sync" />
              Application is {componentState.toLowerCase()}
            </CustomMessageBar>
          ) : null}
        
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
