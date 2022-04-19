/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	IStackTokens,
	PartialTheme,
	Stack,
	useTheme,
	MessageBar,
	MessageBarType,
	IconButton,
	MessageBarButton
} from '@fluentui/react'
import React, { memo, useState } from 'react'
import styled from 'styled-components'

export const NetworkStatusBar: React.FC = memo(
	function NetworkStatusBar() {
		const theme = useTheme()

		const [offlineApplicationStatus, setOfflineStatus] = useState(false)
		
		const menuStackTokens: IStackTokens = {
			childrenGap: theme.spacing.m,
		}

		return (
			<Container>
				<Stack horizontal tokens={menuStackTokens}>
					{offlineApplicationStatus === false ? (
						<CustomMessageBar
							actions={
								<div>
								<MessageBarButton>Close</MessageBarButton>
								</div>
							}
							messageBarType={MessageBarType.success}
							isMultiline={false}>
							<IconButton iconProps={{ iconName: 'WifiEthernet' }} title="WifiEthernet" ariaLabel="WifiEthernet" />
							Application is online
						</CustomMessageBar>

					) : (
							<CustomMessageBar
								actions={
									<div>
									<MessageBarButton>Close</MessageBarButton>
									</div>
								}
								messageBarType={MessageBarType.warning}
								isMultiline={false}>
								<IconButton iconProps={{ iconName: 'WifiWarning4' }} title="WifiWarning4" ariaLabel="WifiWarning4" />
								Application is offline
							</CustomMessageBar>
						)
					}
				</Stack>
			</Container>
		)
	},
)

const Container = styled.div`
	margin-left: ${({ theme }: { theme: PartialTheme }) => theme.spacing?.l2};
	margin-right: 50px;
`

const CustomMessageBar = styled(MessageBar)`
	width: 80%;
	margin-left: 40%;
	margin-right: 40%;
`
