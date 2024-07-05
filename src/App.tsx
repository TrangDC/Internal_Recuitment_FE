import { FC } from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import StyledEngineProvider from '@mui/material/StyledEngineProvider'
import useSettings from 'shared/hooks/useSettings'
import './i18n/i18n'
import { createCustomTheme } from 'shared/theme'
import RTL from 'shared/components/RTL'
import { Toaster } from 'react-hot-toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usePopup from 'contexts/popupProvider/hooks/usePopup'
import ModalConfirmType from 'shared/components/modal/modalByType'
import { AppRoutes } from 'routers/routes'

const App: FC = () => {
  const { settings } = useSettings()
  const { open, setOpen, title, content, onSubmit, type } = usePopup()

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
          <AppRoutes />
          <Toaster position="top-right" reverseOrder={false} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <CssBaseline />
          {open && (
            <ModalConfirmType
              open={open}
              setOpen={setOpen}
              title={title}
              content={content}
              type={type}
              onSubmit={onSubmit}
            />
          )}
        </RTL>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
