import { FC } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@mui/material'
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import useSettings from 'shared/hooks/useSettings'
import routes from './routes'
import './i18n/i18n'
import { createCustomTheme } from 'shared/theme'
import RTL from 'shared/components/RTL'
import { Toaster } from 'react-hot-toast'

const App: FC = () => {
  const router = createBrowserRouter(routes())
  const { settings } = useSettings()

  const theme = createCustomTheme({
    theme: settings.theme,
    direction: settings.direction,
    responsiveFontSizes: settings.responsiveFontSizes,
    lang: settings.lang,
  })

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RTL>
          <Toaster position="top-right" reverseOrder={false} />
          <CssBaseline />
          <RouterProvider router={router} />
        </RTL>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
