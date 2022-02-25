import { Theme, useTheme } from '@fluentui/react'
import { FC, memo, useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAuthProviderContext } from '../components/authProvider'
import Flex from '../components/flexbox/flexbox'
import Header from '../components/header/Header'

const Layout: FC = function Layout() {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [authContext] = useAuthProviderContext()

  useEffect(() => {
    if (
      !authContext.authenticated &&
      !authContext.loading &&
      !/^\/login$/i.test(location.pathname)
    ) {
      navigate('login')
    }
  }, [location, authContext, navigate])

  if (!authContext.authenticated && !/^\/login$/i.test(location.pathname)) {
    return <>Loading...</>
  }

  return (
    <Flex style={{ height: '100%' }} vertical>
      <Flex.Box>
        <Header />
      </Flex.Box>
      <Flex.Box grow={1}>
        <Container theme={theme}>
          <Outlet />
        </Container>
      </Flex.Box>
    </Flex>
  )
}

const Container = styled.div<{ theme: Theme }>`
  /* padding: ${({ theme }: { theme: Theme }) => theme.spacing.m}; */
  height: 100%;
`

export default memo(Layout)
