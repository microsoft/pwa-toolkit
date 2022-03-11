/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Theme, useTheme } from '@fluentui/react'
// import { Icon } from '@fluentui/react/lib/Icon'
import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

// import { AuthenticatedTemplate, useAuthProviderContext } from '../authProvider'
import Flex from '../flexbox/flexbox'
import { Online } from '../online'

const Container = styled.div<{ theme: Theme }>`
  background: ${({ theme }: { theme: Theme }) => theme.palette.themePrimary};
  box-shadow: ${({ theme }: { theme: Theme }) => theme.effects.elevation8};
`

const StyledLink = styled(Link)`
  color: ${({ theme }: { theme: Theme }) => theme.palette.neutralLight};
  font-weight: bold;
  padding: ${({ theme }: { theme: Theme }) => theme.spacing.m};
  text-decoration: none;
  &:hover {
    color: ${({ theme }: { theme: Theme }) => theme.palette.white};
  }
`

// const StyledAnchor = styled.a`
//   color: ${({ theme }: { theme: Theme }) => theme.palette.neutralLight};
//   font-weight: bold;
//   padding: ${({ theme }: { theme: Theme }) => theme.spacing.m};
//   text-decoration: none;
//   &:hover {
//     color: ${({ theme }: { theme: Theme }) => theme.palette.white};
//     cursor: pointer;
//   }
// `

// const StyledSpan = styled.span`
//   font-weight: bold;
//   color: ${({ theme }: { theme: Theme }) => theme.palette.neutralLight};
//   padding: ${({ theme }: { theme: Theme }) => theme.spacing.m};
// `

const Header: FC = function Header() {
  const theme = useTheme()
  // const [authContext, setAuthContext] = useAuthProviderContext<API.User>()
  // const navigate = useNavigate()

  // const handleLogout = useCallback(
  //   async (e: React.MouseEvent<HTMLAnchorElement>) => {
  //     e.preventDefault()
  //     await window.cookieStore.delete('access_token')
  //     setAuthContext({
  //       loading: false,
  //       authenticated: false,
  //     })
  //     navigate('/')
  //   },
  //   [navigate, setAuthContext],
  // )

  return (
    <Container theme={theme}>
      <Flex align="center">
        <Flex.Box>
          <Flex>
            <StyledLink theme={theme} to="/helloWorld">
              Hello World
            </StyledLink>
            <StyledLink theme={theme} to="/">
              Notes
            </StyledLink>
            <StyledLink theme={theme} to="/create-note">
              Create Note
            </StyledLink>
          </Flex>
        </Flex.Box>
        <Flex.Box>
          <Online />
        </Flex.Box>
        {/* <Flex.Box>
          <AuthenticatedTemplate>
            <StyledSpan theme={theme}>
              <Icon iconName="Contact" />
              {'  '}
              Hello, {authContext.payload?.name ?? authContext.payload?.email}
            </StyledSpan>
            <StyledAnchor onClick={handleLogout} theme={theme}>
              Logout
            </StyledAnchor>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <StyledLink theme={theme} to="/login">
              Login
            </StyledLink>
          </UnauthenticatedTemplate>
        </Flex.Box> */}
      </Flex>
    </Container>
  )
}

export default memo(Header)
