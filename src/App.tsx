import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import useSettings from 'shared/hooks/useSettings'
import routes from './routes'
import './i18n/i18n'
import { createCustomTheme } from 'shared/theme'
import RTL from 'shared/components/RTL'

const App: FC = () => {
  const router = createBrowserRouter(routes())
  const { settings } = useSettings()

  const theme = createCustomTheme({
    theme: settings.theme,
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
  })

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RTL>
          <CssBaseline />
          <RouterProvider router={router} />
        </RTL>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
