import React from 'react'
import ReactDOM from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { JWTAuthProvider } from 'contexts/JWTAuth'
import SettingsProvider from 'contexts/settingsContext'
import App from './App'
import 'nprogress/nprogress.css'
import 'simplebar-react/dist/simplebar.min.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PopupProvider } from 'contexts/popupProvider'

let ReactQueryDevtoolsProduction = null
if (process.env.NODE_ENV !== 'production') {
  ReactQueryDevtoolsProduction = React.lazy(() =>
    import('@tanstack/react-query-devtools/build/modern/production.js').then(
      (d) => ({
        default: d.ReactQueryDevtools,
      })
    )
  )
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
const queryClient = new QueryClient()
root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SettingsProvider>
        <JWTAuthProvider>
          <PopupProvider>
            <QueryClientProvider client={queryClient}>
              <App />
              {ReactQueryDevtoolsProduction && (
                <ReactQueryDevtoolsProduction
                  initialIsOpen={false}
                  buttonPosition="bottom-right"
                />
              )}
            </QueryClientProvider>
          </PopupProvider>
        </JWTAuthProvider>
      </SettingsProvider>
    </LocalizationProvider>
  </React.StrictMode>
)
