import { createTheme, ThemeProvider } from '@fluentui/react'
import React, { FC, memo } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from '../components/authProvider'
import { tokenProvider } from '../lib/auth'
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
          <AuthProvider tokenProvider={tokenProvider}>
            <Routes />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default memo(App)
