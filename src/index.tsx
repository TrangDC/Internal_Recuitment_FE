import React from 'react'
import ReactDOM from 'react-dom/client'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { JWTAuthProvider } from 'contexts/JWTAuth'
import SettingsProvider from 'contexts/settingsContext'
import App from './App'
import 'nprogress/nprogress.css'
import 'simplebar-react/dist/simplebar.min.css'
import { ApolloProvider } from '@apollo/client'
import { graphqlClient } from 'services/graphql-services'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <SettingsProvider>
        <JWTAuthProvider>
          <ApolloProvider client={graphqlClient}>
            <App />
          </ApolloProvider>
        </JWTAuthProvider>
      </SettingsProvider>
    </LocalizationProvider>
  </React.StrictMode>
)
