/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { createTheme, ThemeProvider } from '@fluentui/react'
import React, { FC, memo } from 'react'
import { BrowserRouter } from 'react-router-dom'

// import { AuthProvider } from '../components/authProvider'
import { NetworkCheckProvider } from '../components/networkCheckProvider'
import { ReplayOfflineRequestsProvider } from '../components/replayOfflineRequestsProvider'
// import { tokenProvider } from '../lib/auth'
import Routes from './Routes'
import { defaultTheme } from './theme'

const theme = createTheme(defaultTheme)

const themeDivStyles = {
  height: '100%',
}

const App: FC = function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ThemeProvider style={themeDivStyles} theme={theme}>
          {/* <AuthProvider tokenProvider={tokenProvider}> */}
          <NetworkCheckProvider url="/health-check" interval={10 * 1000}>
            <ReplayOfflineRequestsProvider>
              <Routes />
            </ReplayOfflineRequestsProvider>
          </NetworkCheckProvider>
          {/* </AuthProvider> */}
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default memo(App)
